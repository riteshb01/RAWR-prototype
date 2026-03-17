import React from 'react';

const Panel = ({ title, children }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default Panel;