import React from 'react';
import Heatmap from './components/Heatmap';
import WeeklyChart from './components/WeeklyChart';
import DeadlineList from './components/DeadlineList';
import CourseBreakdown from './components/CourseBreakdown';
import AlertsPanel from './components/AlertsPanel';
import { useWorkloadData } from './hooks/useWorkloadData';

const Dashboard = () => {
  const { data, loading, error } = useWorkloadData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Heatmap data={data.heatmap} />
      <WeeklyChart data={data.weeklyWorkload} />
      <DeadlineList deadlines={data.upcomingDeadlines} />
      <CourseBreakdown data={data.courseDistribution} />
      <AlertsPanel alerts={data.impossibleWeeks} />
    </div>
  );
};

export default Dashboard;