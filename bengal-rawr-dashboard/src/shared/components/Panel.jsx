import React from 'react';

const Panel = ({ title, icon, children }) => {
  return (
    <div className="card">
      <h2 className="card-title">
        {icon && <span style={{ marginRight: '0.4rem' }}>{icon}</span>}
        {title}
      </h2>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Panel;