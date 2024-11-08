import React from 'react';
import useStore from '@/store/useStore';

const LoadingSpinner = () => {
  const { isDarkMode } = useStore();
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative">
        <div className={`
          w-12 h-12 rounded-full
          border-4 border-t-transparent
          animate-spin
          ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}
        `} />
        <div className={`
          absolute inset-0
          w-12 h-12 rounded-full
          border-4 border-t-transparent
          animate-ping
          ${isDarkMode ? 'border-primary-dark' : 'border-primary-light'}
          opacity-20
        `} />
      </div>
    </div>
  );
};

export default LoadingSpinner;