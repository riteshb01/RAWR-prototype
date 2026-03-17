import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useWorkloadData } from '../hooks/useWorkloadData';

const WeeklyChart = () => {
  const { data, loading, error } = useWorkloadData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const threshold = 7; // Define your threshold for highlighting

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalWorkload" fill="#3b82f6" />
        {data.map((entry) => (
          entry.totalWorkload > threshold && (
            <Bar key={entry.week} dataKey="totalWorkload" fill="#f59e0b" />
          )
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyChart;