import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEvents, getCourses } from '../dashboard/services/api';
import { EVENT_TYPE_CONFIG } from '../dashboard/utils/constants';

const EventsPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents(),
  });

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  const filtered = (events ?? []).filter(e => {
    if (selectedType   && e.event_type !== selectedType)     return false;
    if (selectedCourse && String(e.course) !== String(selectedCourse)) return false;
    return true;
  });

  // Sort by date ascending
  const sorted = [...filtered].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  const eventTypes = [...new Set((events ?? []).map(e => e.event_type))].sort();

  return (
    <div className="page">
      <Link to="/" className="page-back">← Back</Link>

      <div style={{ marginBottom: '2rem' }}>
        <p className="page-eyebrow">Calendar</p>
        <h1 className="page-title">Events</h1>
        <p className="page-subtitle">All extracted assignments, exams, and deadlines.</p>
      </div>

      {/* Filters */}
      {events && events.length > 0 && (
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="upload-input"
            style={{ flex: 'none', width: 'auto', minWidth: '150px' }}
          >
            <option value="">All types</option>
            {eventTypes.map(t => (
              <option key={t} value={t}>{EVENT_TYPE_CONFIG[t]?.label ?? t}</option>
            ))}
          </select>

          <select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            className="upload-input"
            style={{ flex: 'none', width: 'auto', minWidth: '180px' }}
          >
            <option value="">All courses</option>
            {(courses ?? []).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {(selectedType || selectedCourse) && (
            <button
              onClick={() => { setSelectedType(''); setSelectedCourse(''); }}
              className="upload-btn"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
            >
              Clear filters
            </button>
          )}

          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--ink-3)', alignSelf: 'center' }}>
            {sorted.length} event{sorted.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {isLoading && (
        <div className="dashboard-loading" style={{ minHeight: '30vh' }}>
          <div className="spinner" />
        </div>
      )}

      {error && (
        <div className="card">
          <p className="card-error">Could not load events.</p>
        </div>
      )}

      {events && events.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <div className="empty-state-title">No events yet</div>
            <div className="empty-state-body">
              Upload a syllabus and we'll extract all your deadlines automatically.
            </div>
            <Link to="/upload" className="upload-btn" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
              Upload Syllabus
            </Link>
          </div>
        </div>
      )}

      {sorted.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="detail-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Course</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Weight</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(evt => {
                const config = EVENT_TYPE_CONFIG[evt.event_type] || EVENT_TYPE_CONFIG.other;
                const daysUntil = evt.date
                  ? Math.round((new Date(evt.date) - new Date().setHours(0,0,0,0)) / 86400000)
                  : null;

                return (
                  <tr key={evt.id}>
                    <td style={{ fontWeight: 500, color: 'var(--ink)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: config.color, flexShrink: 0, display: 'inline-block' }} />
                        {evt.title}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${evt.event_type}`}>{config.label}</span>
                    </td>
                    <td style={{ color: 'var(--ink-3)' }}>{evt.course_name || evt.course_code || '—'}</td>
                    <td>
                      {evt.date ? (
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          {daysUntil !== null && daysUntil >= 0 && (
                            <div style={{ fontSize: '0.65rem', color: daysUntil <= 3 ? 'var(--danger)' : daysUntil <= 7 ? 'var(--warn)' : 'var(--ink-4)', fontWeight: 600, marginTop: 1 }}>
                              {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d away`}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--ink-4)' }}>No date</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, fontSize: '0.875rem' }}>
                        {evt.workload ?? '—'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
