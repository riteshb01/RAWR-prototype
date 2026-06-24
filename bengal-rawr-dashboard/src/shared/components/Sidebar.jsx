import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/',          icon: '🏠',  label: 'Dashboard'  },
  { to: '/courses',   icon: '📚',  label: 'Courses'    },
  { to: '/timeline',  icon: '📅',  label: 'Timeline'   },
  { to: '/conflicts', icon: '⚠️',  label: 'Conflicts'  },
  { to: '/workload',  icon: '🔥',  label: 'Workload'   },
  { to: '/insights',  icon: '🤖',  label: 'Insights'   },
  { to: '/settings',  icon: '⚙️',  label: 'Settings'   },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Wordmark */}
      <Link to="/" className="sidebar-wordmark">
        <span className="wordmark-dot" />
        <span className="wordmark-text">Bengal RAWR</span>
      </Link>

      {/* Nav */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Navigation</span>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <span className="sidebar-section-label" style={{ marginTop: '1rem' }}>Actions</span>
        <NavLink
          to="/upload"
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <span className="nav-icon">↑</span>
          Upload Syllabus
        </NavLink>
      </nav>

      {/* Footer CTA */}
      <div className="sidebar-footer">
        <NavLink to="/upload" className="sidebar-upload-btn">
          <span>+</span> New Syllabus
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
