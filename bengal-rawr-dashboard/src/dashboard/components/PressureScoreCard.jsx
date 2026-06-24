import React from 'react';

const PressureScoreCard = ({ score = 72, factors = [] }) => {
  // Determine risk level based on score
  let riskLevel = "Low Risk";
  let riskColor = "var(--accent)";
  let barFill = score;
  
  if (score >= 80) {
    riskLevel = "Critical Overload";
    riskColor = "var(--danger)";
  } else if (score >= 60) {
    riskLevel = "Moderate Risk";
    riskColor = "var(--warn)";
  }

  // Create text based progress bar
  const totalBlocks = 16;
  const filledBlocks = Math.round((score / 100) * totalBlocks);
  const barString = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: `4px solid ${riskColor}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '0.5rem' }}>
            Student Pressure Score
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: '4.5rem', lineHeight: 1, color: 'var(--ink)' }}>
              {score}
            </span>
            <span style={{ fontSize: '1.25rem', color: 'var(--ink-3)' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 500, color: riskColor, marginTop: '0.5rem' }}>
            {riskLevel}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <div style={{ fontSize: '1.25rem', letterSpacing: '2px', color: riskColor, userSelect: 'none' }}>
            {barString}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', textAlign: 'right', maxWidth: '200px' }}>
            Based on upcoming deadlines, overlapping events, and historical workload data.
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Top Contributors
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {factors.map((factor, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--danger)', fontWeight: 600 }}>+{factor.impact}</span>
              <span style={{ color: 'var(--ink-2)' }}>{factor.description}</span>
            </li>
          ))}
          {factors.length === 0 && (
            <li style={{ fontSize: '0.875rem', color: 'var(--ink-4)' }}>No major pressure points detected.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PressureScoreCard;
