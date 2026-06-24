import React from 'react';

const SemesterTimeline = ({ timelineEvents = [] }) => {
  return (
    <div className="card" style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: '600px' }}>
        {/* Timeline Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)' }}>August</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)' }}>September</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)' }}>October</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)' }}>November</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-3)' }}>December</span>
        </div>

        {/* Timeline Track */}
        <div style={{ position: 'relative', height: '100px' }}>
          {timelineEvents.map((evt, idx) => {
            let color = 'var(--accent)'; // Normal
            if (evt.status === 'busy') color = 'var(--warn)';
            if (evt.status === 'overloaded') color = 'var(--danger)';
            
            return (
              <div 
                key={idx} 
                style={{ 
                  position: 'absolute', 
                  left: `${evt.positionPercent}%`, 
                  top: `${(idx % 3) * 30}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: 'translateX(-50%)'
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--ink-2)', marginBottom: '4px', whiteSpace: 'nowrap' }}>
                  {evt.label}
                </div>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: color,
                  border: '2px solid var(--bg-card)',
                  boxShadow: '0 0 0 1px var(--border)'
                }} title={evt.date} />
                {/* Vertical line connecting to track */}
                <div style={{ width: '2px', height: '100%', backgroundColor: 'var(--border)', position: 'absolute', top: '28px', zIndex: -1 }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SemesterTimeline;
