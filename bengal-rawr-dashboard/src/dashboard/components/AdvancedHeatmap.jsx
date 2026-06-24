import React, { useState } from 'react';

// Mock data for Categorical Heatmap
const catData = {
  weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  categories: [
    { name: "Exams", values: [0, 0, 1, 0, 2, 0, 0, 3] },
    { name: "Projects", values: [0, 0, 0, 1, 0, 2, 1, 2] },
    { name: "Homework", values: [3, 4, 3, 4, 3, 2, 3, 1] },
    { name: "Reading", values: [5, 4, 4, 3, 2, 2, 1, 0] }
  ]
};

// Mock data for Hourly Heatmap (Days vs Hours)
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"];
const hourlyData = hours.map(() => days.map(() => Math.floor(Math.random() * 4)));

const getIntensityColor = (val, max) => {
  if (val === 0) return 'var(--bg)';
  const ratio = val / max;
  if (ratio > 0.6) return 'var(--danger)';
  if (ratio > 0.3) return 'var(--warn)';
  return 'var(--accent)';
};

const AdvancedHeatmap = () => {
  const [view, setView] = useState('categorical');

  return (
    <div style={{ width: '100%' }}>
      {/* Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', background: 'var(--bg-subtle)', borderRadius: '8px', padding: '4px' }}>
          <button 
            onClick={() => setView('categorical')}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.8rem', 
              fontWeight: 600, 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              background: view === 'categorical' ? 'var(--bg-card)' : 'transparent',
              color: view === 'categorical' ? 'var(--ink)' : 'var(--ink-3)',
              boxShadow: view === 'categorical' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            By Event Type
          </button>
          <button 
            onClick={() => setView('hourly')}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.8rem', 
              fontWeight: 600, 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              background: view === 'hourly' ? 'var(--bg-card)' : 'transparent',
              color: view === 'hourly' ? 'var(--ink)' : 'var(--ink-3)',
              boxShadow: view === 'hourly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Hourly Deep Study
          </button>
        </div>
      </div>

      {/* Categorical View */}
      {view === 'categorical' && (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(8, 1fr)', gap: '4px', minWidth: '500px' }}>
            <div /> {/* Empty top-left */}
            {catData.weeks.map(w => <div key={w} style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--ink-4)', fontWeight: 600 }}>{w}</div>)}
            
            {catData.categories.map((cat, rowIdx) => (
              <React.Fragment key={cat.name}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-2)' }}>{cat.name}</div>
                {cat.values.map((val, colIdx) => (
                  <div 
                    key={`${rowIdx}-${colIdx}`}
                    title={`${cat.name} in ${catData.weeks[colIdx]}: ${val} events`}
                    style={{ 
                      height: '32px', 
                      backgroundColor: getIntensityColor(val, 5),
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      opacity: val === 0 ? 0.3 : 1
                    }} 
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-3)', marginTop: '1.5rem' }}>
            This view helps you understand <strong>what kind of work</strong> is piling up. Notice how Reading drops off when Exams pick up.
          </p>
        </div>
      )}

      {/* Hourly View */}
      {view === 'hourly' && (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', gap: '4px', minWidth: '500px' }}>
            <div />
            {days.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--ink-4)', fontWeight: 600 }}>{d}</div>)}
            
            {hours.map((h, rowIdx) => (
              <React.Fragment key={h}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px', fontSize: '0.65rem', color: 'var(--ink-3)' }}>{h}</div>
                {hourlyData[rowIdx].map((val, colIdx) => (
                  <div 
                    key={`${rowIdx}-${colIdx}`}
                    style={{ 
                      height: '24px', 
                      backgroundColor: val > 0 ? 'var(--ink)' : 'var(--bg)',
                      opacity: val > 0 ? (val * 0.3) : 1,
                      borderRadius: '4px',
                      border: '1px solid var(--border)'
                    }} 
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-3)', marginTop: '1.5rem' }}>
            This view maps out the <strong>deep study blocks</strong> you'll need to survive a heavy week.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedHeatmap;
