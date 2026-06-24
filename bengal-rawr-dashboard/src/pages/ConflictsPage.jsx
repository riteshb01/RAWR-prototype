import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getConflicts } from '../dashboard/services/api';
import { SEVERITY_CONFIG } from '../dashboard/utils/constants';

const ConflictsPage = () => {
  const { data: conflicts, isLoading, error } = useQuery({
    queryKey: ['conflicts'],
    queryFn: getConflicts,
  });

  const sorted = [...(conflicts ?? [])].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return (order[a.severity] ?? 4) - (order[b.severity] ?? 4);
  });

  const bySeverity = {
    critical: sorted.filter(c => c.severity === 'critical').length,
    high:     sorted.filter(c => c.severity === 'high').length,
    medium:   sorted.filter(c => c.severity === 'medium').length,
    low:      sorted.filter(c => c.severity === 'low').length,
  };

  return (
    <div className="page">
      <Link to="/" className="page-back">← Back</Link>

      <div style={{ marginBottom: '2rem' }}>
        <p className="page-eyebrow">Analysis</p>
        <h1 className="page-title">Conflicts</h1>
        <p className="page-subtitle">Weeks where your workload exceeds the recommended threshold.</p>
      </div>

      {isLoading && (
        <div className="dashboard-loading" style={{ minHeight: '30vh' }}>
          <div className="spinner" />
        </div>
      )}

      {error && (
        <div className="card">
          <p className="card-error">Could not load conflict data.</p>
        </div>
      )}

      {conflicts && conflicts.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">✓</div>
            <div className="empty-state-title">No conflicts detected</div>
            <div className="empty-state-body">
              Your schedule looks manageable! Upload more syllabi to keep the analysis up to date.
            </div>
          </div>
        </div>
      )}

      {sorted.length > 0 && (
        <>
          {/* Severity breakdown */}
          <div className="stat-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">Critical</div>
              <div className="stat-card-value danger">{bySeverity.critical}</div>
              <div className="stat-card-sublabel">weeks flagged</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">High</div>
              <div className="stat-card-value warn">{bySeverity.high}</div>
              <div className="stat-card-sublabel">weeks flagged</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">Medium</div>
              <div className="stat-card-value">{bySeverity.medium}</div>
              <div className="stat-card-sublabel">weeks flagged</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">Low</div>
              <div className="stat-card-value">{bySeverity.low}</div>
              <div className="stat-card-sublabel">weeks flagged</div>
            </div>
          </div>

          {/* Conflict table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Severity</th>
                  <th>Load</th>
                  <th>Threshold</th>
                  <th>Courses Affected</th>
                  <th>Period</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(conflict => (
                  <tr key={conflict.id || conflict.week_key}>
                    <td style={{ fontWeight: 600, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
                      {conflict.week_key}
                    </td>
                    <td>
                      <span className={`badge ${conflict.severity}`}>
                        {SEVERITY_CONFIG[conflict.severity]?.icon} {conflict.severity}
                      </span>
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: conflict.severity === 'critical' ? 'var(--danger)' : 'var(--ink)' }}>
                      {conflict.total_load}
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-3)' }}>
                      {conflict.threshold}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {(conflict.courses_affected ?? []).map(c => (
                          <span key={c} className="badge">{c}</span>
                        ))}
                        {(!conflict.courses_affected || conflict.courses_affected.length === 0) && (
                          <span style={{ color: 'var(--ink-4)' }}>—</span>
                        )}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>
                      {conflict.week_start && conflict.week_end
                        ? `${new Date(conflict.week_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(conflict.week_end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                        : '—'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail cards */}
          <div style={{ marginTop: '2rem' }}>
            <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>Detail View</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sorted.map(conflict => (
                <div key={`detail-${conflict.id || conflict.week_key}`} className="card" style={{ borderLeft: `3px solid ${SEVERITY_CONFIG[conflict.severity]?.color ?? 'var(--border)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{conflict.week_key}</span>
                        <span className={`badge ${conflict.severity}`}>{SEVERITY_CONFIG[conflict.severity]?.label}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', marginBottom: '0.5rem' }}>
                        {conflict.message || `Total workload of ${conflict.total_load} exceeds the threshold of ${conflict.threshold}.`}
                      </p>
                      {(conflict.courses_affected ?? []).length > 0 && (
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                          {conflict.courses_affected.map(c => (
                            <span key={c} className="alert-course-tag">{c}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2rem', lineHeight: 1, letterSpacing: '-0.03em', color: conflict.severity === 'critical' ? 'var(--danger)' : 'var(--warn)' }}>
                        {conflict.total_load}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--ink-4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>workload pts</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConflictsPage;
