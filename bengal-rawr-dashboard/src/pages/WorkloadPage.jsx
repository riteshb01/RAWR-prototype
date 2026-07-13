import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeeklyWorkload } from '../dashboard/services/api';
import PressureLineChart from '../dashboard/components/PressureLineChart';
import CourseDoughnutCharts from '../dashboard/components/CourseDoughnutCharts';
import AdvancedHeatmap from '../dashboard/components/AdvancedHeatmap';

const transformCategoricalData = (data) => {
  if (!data || !data.weekly_workload) return null;
  
  const weeklyWorkload = data.weekly_workload;
  const weekKeys = Object.keys(weeklyWorkload).sort();
  
  // Format week labels (e.g. "2026-W11" -> "W11")
  const weeks = weekKeys.map(k => {
    const parts = k.split('-W');
    return parts.length === 2 ? `W${parts[1]}` : k;
  });

  // Get all unique event types across all weeks
  const allTypes = new Set();
  weekKeys.forEach(wk => {
    Object.keys(weeklyWorkload[wk].by_type || {}).forEach(type => {
      allTypes.add(type);
    });
  });

  // Build the categories array
  const categories = Array.from(allTypes).map(type => {
    const values = weekKeys.map(wk => {
      return weeklyWorkload[wk].by_type?.[type] || 0;
    });
    return { name: type, values };
  });

  return { weeks, categories };
};

const WorkloadPage = () => {
  const { data: rawWorkloadData, isLoading, error } = useQuery({
    queryKey: ['weeklyWorkload'],
    queryFn: getWeeklyWorkload,
  });

  const categoricalData = useMemo(() => transformCategoricalData(rawWorkloadData), [rawWorkloadData]);

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
          {isLoading ? (
            <div className="dashboard-loading" style={{ minHeight: '200px' }}>
              <div className="spinner" />
            </div>
          ) : error ? (
            <p className="card-error">Could not load workload matrix.</p>
          ) : (
            <AdvancedHeatmap categoricalData={categoricalData} />
          )}
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

