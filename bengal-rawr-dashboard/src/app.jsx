import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './shared/components/Sidebar';
import MobileNav from './shared/components/MobileNav';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import EventsPage from './pages/EventsPage';
import ConflictsPage from './pages/ConflictsPage';
import UploadPage from './pages/UploadPage';
import TimelinePage from './pages/TimelinePage';
import WorkloadPage from './pages/WorkloadPage';
import InsightsPage from './pages/InsightsPage';
import SettingsPage from './pages/SettingsPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Sidebar />
        <MobileNav />
        <main className="main-content">
          <Routes>
            <Route path="/"          element={<DashboardPage />} />
            <Route path="/courses"   element={<CoursesPage />} />
            <Route path="/timeline"  element={<TimelinePage />} />
            <Route path="/conflicts" element={<ConflictsPage />} />
            <Route path="/workload"  element={<WorkloadPage />} />
            <Route path="/insights"  element={<InsightsPage />} />
            <Route path="/settings"  element={<SettingsPage />} />
            <Route path="/events"    element={<EventsPage />} />
            <Route path="/upload"    element={<UploadPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;