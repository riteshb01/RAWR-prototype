import React from 'react';
import PressureLineChart from '../dashboard/components/PressureLineChart';
import CourseDoughnutCharts from '../dashboard/components/CourseDoughnutCharts';
import AdvancedHeatmap from '../dashboard/components/AdvancedHeatmap';

const WorkloadPage = () => {
  return (
    <div className="page">
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="page-eyebrow">Analytics</p>
        <h1 className="page-title">Workload Forecast</h1>
        <p className="page-subtitle">Deep dive into your predictive workload data with interactive visualizations.</p>
      </div>

      {/* Pressure Line Chart Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="section-label">Burnout Predictor Curve</span>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>
            <strong>What this means:</strong> Your cumulative pressure peaks heavily in <strong>Week 8</strong>. The line enters the <span style={{ color: 'var(--danger)', fontWeight: 600 }}>Red Zone (Critical Overload)</span>. Consider finishing your CIS375 project in Week 6 or 7 before the MAT202 midterm hits.
          </p>
          <PressureLineChart />
        </div>
      </div>

      {/* Advanced Heatmap Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="section-label">Advanced Workload Matrix</span>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AdvancedHeatmap />
        </div>
      </div>

      {/* Course Doughnuts Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <span className="section-label">Evaluation Breakdown</span>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>
            <strong>What this means:</strong> This shows exactly <em>how</em> each course will grade you. Notice that MAT202 is highly dependent on exams, meaning you need consistent, long-term studying. Conversely, CIS375 is almost entirely project-based, allowing for burst-style deep work sessions.
          </p>
          <CourseDoughnutCharts />
        </div>
      </div>

    </div>
  );
};

export default WorkloadPage;
