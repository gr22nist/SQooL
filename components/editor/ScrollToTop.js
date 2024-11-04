import React, { useState, useEffect } from 'react';
import { ArrowUp } from '../icons/IconSet';
import useStore from '@/store/useStore';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useStore();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonClass = `
    fixed bottom-20 right-6
    w-10 h-10
    flex items-center justify-center
    rounded-full
    shadow-lg
    transition-all duration-300
    ${isDarkMode 
      ? 'bg-slate-800 hover:bg-slate-700' 
      : 'bg-white hover:bg-slate-50'}
    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    z-50
  `;

  return (
    <button 
      className={buttonClass}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
    >
      <ArrowUp className={`w-5 h-5 ${isDarkMode ? 'fill-slate-400' : 'fill-slate-600'}`} />
    </button>
  );
};

export default ScrollToTop;
