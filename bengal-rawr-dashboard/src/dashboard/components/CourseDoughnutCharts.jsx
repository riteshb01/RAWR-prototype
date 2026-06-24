import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const courseData = [
  {
    course: "MAT202",
    data: [
      { name: 'Exams', value: 60, color: '#D04545' },
      { name: 'Homework', value: 30, color: '#2DB66E' },
      { name: 'Quizzes', value: 10, color: '#E07B3A' }
    ],
    summary: "Heavy exam focus. Consistent homework required."
  },
  {
    course: "CIS375",
    data: [
      { name: 'Projects', value: 70, color: '#1A6B42' },
      { name: 'Exams', value: 20, color: '#D04545' },
      { name: 'Participation', value: 10, color: '#8A8A8A' }
    ],
    summary: "Project-based. Final weeks will be demanding."
  },
  {
    course: "ENG105",
    data: [
      { name: 'Essays', value: 50, color: '#E07B3A' },
      { name: 'Reading', value: 40, color: '#2DB66E' },
      { name: 'Discussion', value: 10, color: '#8A8A8A' }
    ],
    summary: "Consistent reading load. Peaks during essay weeks."
  }
];

const CourseDoughnutCharts = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
      {courseData.map((courseInfo, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.25rem' }}>{courseInfo.course}</h3>
          
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseInfo.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {courseInfo.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {courseInfo.data.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--ink-2)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.4, maxWidth: '200px' }}>
            {courseInfo.summary}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CourseDoughnutCharts;
