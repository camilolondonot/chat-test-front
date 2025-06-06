import React from 'react';

const LoadingDefault = () => {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <div className="w-10 h-10 border-4 border-blue-800 dark:border-slate-200 dark:border-t-transparent border-t-transparent rounded-full animate-spin transition-all duration-300"></div>
    </div>
  );
};

export default LoadingDefault;
