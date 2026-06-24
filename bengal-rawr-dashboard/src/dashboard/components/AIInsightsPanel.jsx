import React from 'react';

const AIInsightsPanel = ({ insights = [] }) => {
  return (
    <div className="card" style={{ background: 'var(--bg-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🤖</span>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>AI Recommendations</h2>
      </div>
      
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {insights.map((insight, idx) => (
          <li key={idx} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--ink-2)' }}>
            <span style={{ flexShrink: 0 }}>💡</span>
            <span>{insight}</span>
          </li>
        ))}
        {insights.length === 0 && (
          <li style={{ fontSize: '0.9rem', color: 'var(--ink-4)' }}>
            Upload more syllabi to generate AI insights.
          </li>
        )}
      </ul>
    </div>
  );
};

export default AIInsightsPanel;
