import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../dashboard/services/api';

const CoursesPage = () => {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  return (
    <div className="page">
      <Link to="/" className="page-back">← Back</Link>

      <div style={{ marginBottom: '2.5rem' }}>
        <p className="page-eyebrow">Overview</p>
        <h1 className="page-title">Courses</h1>
        <p className="page-subtitle">All enrolled courses and their syllabus details.</p>
      </div>

      {isLoading && (
        <div className="dashboard-loading" style={{ minHeight: '30vh' }}>
          <div className="spinner" />
        </div>
      )}

      {error && (
        <div className="card">
          <p className="card-error">Could not load courses — is the backend running?</p>
        </div>
      )}

      {courses && courses.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">🎓</div>
            <div className="empty-state-title">No courses yet</div>
            <div className="empty-state-body">Upload a syllabus to add your first course.</div>
            <Link to="/upload" className="upload-btn" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
              Upload Syllabus
            </Link>
          </div>
        </div>
      )}

      {courses && courses.length > 0 && (
        <>
          {/* Summary stat cards */}
          <div className="stat-grid" style={{ marginBottom: '2rem' }}>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">Total Courses</div>
              <div className="stat-card-value">{courses.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">Total Events</div>
              <div className="stat-card-value">
                {courses.reduce((sum, c) => sum + (c.event_count ?? 0), 0)}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">Avg Events / Course</div>
              <div className="stat-card-value">
                {courses.length > 0
                  ? Math.round(courses.reduce((s, c) => s + (c.event_count ?? 0), 0) / courses.length)
                  : 0}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-arrow">→</div>
              <div className="stat-card-label">Conflicts</div>
              <div className="stat-card-value warn">
                {courses.reduce((sum, c) => sum + (c.conflict_count ?? 0), 0)}
              </div>
            </div>
          </div>

          {/* Courses table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="detail-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Professor</th>
                  <th>Semester</th>
                  <th style={{ textAlign: 'right' }}>Events</th>
                  <th style={{ textAlign: 'right' }}>Conflicts</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{course.name}</td>
                    <td>
                      <span className="badge">{course.code || '—'}</span>
                    </td>
                    <td>{course.professor || <span style={{ color: 'var(--ink-4)' }}>—</span>}</td>
                    <td>{course.semester || <span style={{ color: 'var(--ink-4)' }}>—</span>}</td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                      {course.event_count ?? 0}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {(course.conflict_count ?? 0) > 0
                        ? <span className="badge critical">{course.conflict_count}</span>
                        : <span style={{ color: 'var(--ink-4)' }}>—</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
