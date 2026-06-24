import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getCourses } from '../services/api';

// Editorial muted palette — not loud, not dark
const PALETTE = ['#1A1A1A', '#2DB66E', '#E07B3A', '#7C8DB0', '#C4A47C', '#8A6F8A', '#4A7C6F'];

const CustomTooltip = ({ active, payload }) => {
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
      <div style={{ fontWeight: 600 }}>{payload[0].payload.fullName}</div>
      <div style={{ color: '#4A4A4A' }}>{payload[0].value} events</div>
    </div>
  );
};

const CourseBreakdown = () => {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  if (isLoading) return <div className="card-loading">Loading…</div>;
  if (error)    return <div className="card-error">Could not load courses.</div>;
  if (!courses || courses.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '1.5rem 0' }}>
        <div className="empty-state-title">No courses yet</div>
      </div>
    );
  }

  const pieData = courses.map(c => ({
    name: c.code || c.name,
    fullName: c.name,
    value: c.event_count ?? 0,
  })).filter(d => d.value > 0);

  return (
    <div>
      {pieData.length > 0 && (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}

      <div className="course-list">
        {courses.map((course, i) => (
          <div key={course.id} className="course-list-item">
            <span className="course-dot" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
            <span className="course-name">{course.name}</span>
            <span className="course-code">{course.code}</span>
            <span className="course-event-count">{course.event_count ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBreakdown;