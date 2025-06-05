import React from 'react';
import './LoadingTapping.sass'

const LoadingTapping = () => {
  return (
    <div className="loading-dots">
      <span className="dot bg-gray-700 dark:bg-slate-300"></span>
      <span className="dot bg-gray-700 dark:bg-slate-300"></span>
      <span className="dot bg-gray-700 dark:bg-slate-300"></span>
    </div>
  );
};

export default LoadingTapping;
