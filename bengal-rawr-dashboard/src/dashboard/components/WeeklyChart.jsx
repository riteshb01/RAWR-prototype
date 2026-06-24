import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { getWeeklyWorkload } from '../services/api';
import { WORKLOAD_THRESHOLD } from '../utils/constants';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E5E3DF',
      borderRadius: '0.75rem',
      padding: '0.65rem 1rem',
      fontSize: '0.8rem',
      color: '#1A1A1A',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 3 }}>{label}</div>
      <div style={{ color: '#4A4A4A' }}>Workload: <strong>{payload[0]?.value}</strong></div>
    </div>
  );
};

const WeeklyChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weeklyWorkload'],
    queryFn: getWeeklyWorkload,
  });

  if (isLoading) return <div className="card-loading">Loading chart…</div>;
  if (error)    return <div className="card-error">Could not load workload data.</div>;

  const threshold = data?.threshold ?? WORKLOAD_THRESHOLD;
  const weeklyWorkload = data?.weekly_workload ?? {};

  const chartData = Object.entries(weeklyWorkload)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekKey, weekData]) => ({
      week: weekKey.replace('2026-', ''),   // "W11" — shorter labels
      fullWeek: weekKey,
      total: weekData.total ?? 0,
    }));

  if (chartData.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '2rem 0' }}>
        <div className="empty-state-title">No weekly data yet</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 32, left: -10 }}>
        <CartesianGrid strokeDasharray="2 4" vertical={false} />
        <XAxis
          dataKey="week"
          tick={{ fill: '#8A8A8A', fontSize: 10, fontFamily: 'Instrument Sans, sans-serif' }}
          angle={-45}
          textAnchor="end"
          height={48}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#8A8A8A', fontSize: 10, fontFamily: 'Instrument Sans, sans-serif' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F4F2EE' }} />
        <ReferenceLine
          y={threshold}
          stroke="#E5E3DF"
          strokeDasharray="4 4"
          label={{ value: `threshold`, position: 'insideTopRight', fill: '#BDBDBD', fontSize: 9, fontFamily: 'Instrument Sans, sans-serif' }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} maxBarSize={28}>
          {chartData.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.total > threshold ? '#2DB66E' : '#1A1A1A'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyChart;