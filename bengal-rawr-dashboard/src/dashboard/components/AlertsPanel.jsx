import React from 'react';
import { SEVERITY_CONFIG } from '../utils/constants';

const AlertsPanel = ({ conflicts = [] }) => {
  if (conflicts.length === 0) {
    return (
      <div className="alert-ok">
        <span>✓</span>
        <span>No conflicts detected — your schedule looks manageable.</span>
      </div>
    );
  }

  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...conflicts].sort(
    (a, b) => (severityOrder[a.severity] ?? 4) - (severityOrder[b.severity] ?? 4)
  );

  return (
    <ul className="alert-list">
      {sorted.map(conflict => {
        const config = SEVERITY_CONFIG[conflict.severity] || SEVERITY_CONFIG.medium;
        return (
          <li
            key={conflict.id || conflict.week_key}
            className={`alert-item severity-${conflict.severity}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div className="alert-header" style={{ marginBottom: 0 }}>
              <span style={{ fontSize: '1.25rem' }}>{conflict.severity === 'critical' ? '🔥' : '⚠️'}</span>
              <span className="alert-week">{conflict.week_key} Overload</span>
              <span className="alert-badge">{config.label}</span>
            </div>
            
            {conflict.courses_affected?.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '2rem' }}>
                {conflict.courses_affected.map(c => (
                  <span key={c} style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>• {c}</span>
                ))}
              </div>
            )}

            <div style={{ paddingLeft: '2rem', display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--ink-4)', fontWeight: 600 }}>Impact</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--danger)' }}>
                  Pressure Score +{conflict.impact || 11}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--ink-4)', fontWeight: 600 }}>Suggestion</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--ink-2)' }}>
                  {conflict.suggestion || "Start project 5 days earlier"}
                </div>
              </div>
            </div>
            
            <div style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
               <button style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.25rem 0.75rem', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600, color: 'var(--ink-2)' }}>
                 View Plan
               </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AlertsPanel;