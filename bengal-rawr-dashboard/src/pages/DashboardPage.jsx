import React from 'react';
import { Link } from 'react-router-dom';
import Heatmap from '../dashboard/components/Heatmap';
import WeeklyChart from '../dashboard/components/WeeklyChart';
import CourseBreakdown from '../dashboard/components/CourseBreakdown';
import DeadlineList from '../dashboard/components/DeadlineList';
import AlertsPanel from '../dashboard/components/AlertsPanel';
import PressureScoreCard from '../dashboard/components/PressureScoreCard';
import AIInsightsPanel from '../dashboard/components/AIInsightsPanel';
import SemesterTimeline from '../dashboard/components/SemesterTimeline';
import { useWorkloadData } from '../dashboard/hooks/useWorkloadData';

const DashboardPage = () => {
  const { data, isLoading, error } = useWorkloadData();

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner" />
        <p>Loading your semester…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="dashboard-error">
          <div style={{ fontSize: '2rem' }}>⚠</div>
          <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '1.5rem', fontWeight: 400 }}>
            Could not connect to backend
          </h2>
          <p style={{ color: 'var(--ink-3)', fontSize: '0.875rem' }}>
            Make sure Django is running at <code>localhost:8000</code>
          </p>
        </div>
      </div>
    );
  }

  const stats = data ?? {};
  // For the new UI, we use mock data to demonstrate the PM's vision
  const pressureFactors = [
    { impact: 5, description: "MAT202 Midterm" },
    { impact: 4, description: "CIS375 Project" },
    { impact: 2, description: "CIS494 Presentation" }
  ];

  const insights = [
    "Start CIS375 project by September 18",
    "Week 8 exceeds your average workload by 42%",
    "Completing MAT202 homework early reduces overload risk by 17%"
  ];

  const timelineEvents = [
    { label: "Quiz", date: "Aug 20", positionPercent: 10, status: "normal" },
    { label: "Assignment", date: "Sep 5", positionPercent: 30, status: "normal" },
    { label: "Midterm", date: "Sep 25", positionPercent: 50, status: "busy" },
    { label: "Project", date: "Oct 15", positionPercent: 70, status: "overloaded" },
    { label: "Final", date: "Dec 10", positionPercent: 95, status: "normal" }
  ];

  const mockConflicts = [
    {
      id: 1,
      week_key: "Week 8",
      severity: "critical",
      courses_affected: ["MAT202 Midterm", "CIS375 Project", "CIS494 Presentation"],
      impact: 11,
      suggestion: "Start MAT202 Project 5 days earlier"
    }
  ];

  const heatmapData = stats.heatmap_data ?? {};

  return (
    <div className="page">
      {/* ── Actionable Hero Greeting ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="page-title">Good Evening, Ritesh</h1>
        <p className="page-subtitle" style={{ fontSize: '1.1rem' }}>
          Your semester is currently manageable.
        </p>
      </div>

      {/* ── 1. Student Pressure Score (Hero) ── */}
      <div style={{ marginBottom: '2rem' }}>
        <PressureScoreCard score={72} factors={pressureFactors} />
      </div>

      {/* ── 2. Actionable Stat Cards ── */}
      <div className="stat-grid" style={{ marginBottom: '3rem' }}>
        <div className="stat-card">
          <div className="stat-card-label">📈 Semester Health</div>
          <div className="stat-card-value">72<span style={{ fontSize: '1.5rem', color: 'var(--ink-3)' }}>/100</span></div>
          <div className="stat-card-sublabel">Moderate Risk</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">⚠️ Upcoming Risk</div>
          <div className="stat-card-value warn" style={{ fontSize: '2.5rem' }}>Week 8</div>
          <div className="stat-card-sublabel">11 Pressure Points</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">📚 Next Deadline</div>
          <div className="stat-card-value" style={{ fontSize: '2rem', lineHeight: 1.2 }}>MAT202</div>
          <div className="stat-card-sublabel">Project • 4 Days Left</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">🔥 Workload Trend</div>
          <div className="stat-card-value danger" style={{ fontSize: '2.5rem' }}>+18%</div>
          <div className="stat-card-sublabel">this month</div>
        </div>
      </div>

      {/* ── 3. Workload Heatmap ── */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="section-label">Workload Heatmap</span>
        </div>
        <div className="card">
          <Heatmap heatmapData={heatmapData} />
        </div>
      </div>

      {/* ── 4. AI Recommendations ── */}
      <div className="dashboard-section">
        <AIInsightsPanel insights={insights} />
      </div>

      {/* ── 5. Timeline View ── */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="section-label">Semester Timeline</span>
          <Link to="/timeline" style={{ fontSize: '0.75rem', color: 'var(--ink-3)', textDecoration: 'none', fontWeight: 500 }}>
            View full →
          </Link>
        </div>
        <SemesterTimeline timelineEvents={timelineEvents} />
      </div>

      {/* ── 6. Conflict Alerts ── */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="section-label">Conflict Alerts</span>
        </div>
        <div className="card">
          <AlertsPanel conflicts={mockConflicts} />
        </div>
      </div>

      {/* ── 7. Value-prop Upload CTA ── */}
      <div className="dashboard-section">
        <Link to="/upload" className="card-cta">
          <div className="card-cta-arrow">→</div>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
            BengalRAWR Copilot
          </p>
          <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            Upload Syllabus
          </h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
              <span>✓ Extract deadlines automatically</span>
              <span>✓ Detect workload conflicts</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
              <span>✓ Generate workload forecast</span>
              <span>✓ Export to Google Calendar</span>
            </div>
          </div>
          <button style={{ background: '#fff', color: 'var(--ink)', border: 'none', borderRadius: '4px', padding: '0.5rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
            Upload Now
          </button>
        </Link>
      </div>

    </div>
  );
};

export default DashboardPage;
