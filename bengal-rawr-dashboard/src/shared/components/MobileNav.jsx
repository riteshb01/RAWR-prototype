import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const TABS = [
  { to: '/',          icon: '⊞', label: 'Home'      },
  { to: '/courses',   icon: '🎓', label: 'Courses'   },
  { to: '/events',    icon: '📅', label: 'Events'    },
  { to: '/conflicts', icon: '⚡', label: 'Conflicts' },
  { to: '/upload',    icon: '↑',  label: 'Upload'    },
];

const MobileNav = () => {
  return (
    <>
      {/* Top bar */}
      <header className="mobile-topbar">
        <Link to="/" className="sidebar-wordmark" style={{ paddingBottom: 0, borderBottom: 'none', marginBottom: 0 }}>
          <span className="wordmark-dot" />
          <span className="wordmark-text">Bengal RAWR</span>
        </Link>
      </header>

      {/* Bottom tabs */}
      <nav className="mobile-bottombar">
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) => `mobile-tab${isActive ? ' active' : ''}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default MobileNav;
