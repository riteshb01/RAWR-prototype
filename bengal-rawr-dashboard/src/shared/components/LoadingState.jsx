import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      <span className="ml-4 text-lg text-gray-500">Loading...</span>
    </div>
  );
};

export default LoadingState;