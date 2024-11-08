// components/Toast.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useStore from '@/store/useStore';

const Toast = () => {
  const { toastMessage, toastType, hideToast } = useStore((state) => ({
    toastMessage: state.toastMessage,
    toastType: state.toastType,
    hideToast: state.hideToast,
  }));

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  if (!toastMessage) return null;

  const baseClass = `
    fixed top-32 left-1/2 transform -translate-x-1/2 
    py-4 px-8 rounded-lg shadow-lg
    transition-all duration-500 ease-in-out
    font-medium text-slate-50 z-[100]
  `;

  const typeClasses = {
    success: 'bg-green-500 bg-opacity-80',
    error: 'bg-red-500 bg-opacity-80',
    warning: 'bg-yellow-500 bg-opacity-80',
    info: 'bg-blue-500 bg-opacity-80'
  };

  const toastClass = `${baseClass} ${typeClasses[toastType] || typeClasses.info}`;

  return (
    <div className={toastClass}>
      {toastMessage}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
};

export default Toast;