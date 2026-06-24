import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';

const data = [
  { week: 'W1', score: 20 },
  { week: 'W2', score: 35 },
  { week: 'W3', score: 40 },
  { week: 'W4', score: 55 },
  { week: 'W5', score: 45 },
  { week: 'W6', score: 65 },
  { week: 'W7', score: 85 },
  { week: 'W8', score: 95 }, // Peak
  { week: 'W9', score: 60 },
  { week: 'W10', score: 40 },
  { week: 'W11', score: 50 },
  { week: 'W12', score: 70 },
  { week: 'W13', score: 75 },
  { week: 'W14', score: 90 },
  { week: 'W15', score: 50 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    let status = "Safe";
    let color = "var(--accent)";
    if (score > 80) {
      status = "Critical Overload";
      color = "var(--danger)";
    } else if (score > 60) {
      status = "High Pressure";
      color = "var(--warn)";
    }

    return (
      <div style={{ background: '#fff', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)' }}>{label}</p>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color }}>Score: {score}</p>
        <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--ink-3)' }}>{status}</p>
      </div>
    );
  }
  return null;
};

const PressureLineChart = () => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink-4)' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--ink-4)' }} domain={[0, 100]} ticks={[0, 30, 60, 80, 100]} />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Background Zones */}
          <ReferenceArea y1={80} y2={100} fill="#FEE2E2" fillOpacity={0.4} />
          <ReferenceArea y1={60} y2={80} fill="#FEF0E7" fillOpacity={0.4} />
          <ReferenceArea y1={0} y2={60} fill="#D1F0E1" fillOpacity={0.4} />

          {/* Line */}
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="var(--ink)" 
            strokeWidth={3} 
            dot={{ r: 4, fill: 'var(--bg-card)', stroke: 'var(--ink)', strokeWidth: 2 }} 
            activeDot={{ r: 6, fill: 'var(--ink)', stroke: 'var(--bg-card)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PressureLineChart;
