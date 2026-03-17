import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useWorkloadData } from '../hooks/useWorkloadData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

const CourseBreakdown = () => {
  const { workloadData, isLoading, error } = useWorkloadData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const data = workloadData.courses.map(course => ({
    name: course.course_name,
    value: course.events.reduce((total, event) => total + event.weight, 0),
  }));

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Course Workload Breakdown</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={entry => entry.name}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CourseBreakdown;