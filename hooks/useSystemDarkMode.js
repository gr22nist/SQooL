import { useEffect } from 'react';
import useStore from '@/store/useStore';

const useSystemDarkMode = () => {
  const { setDarkMode } = useStore();

  useEffect(() => {
    const checkSystemDarkMode = () => {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode) {
        setDarkMode(savedMode === 'enabled');
        return;
      }

      try {
        const isDark = 
          window.matchMedia('(prefers-color-scheme: dark)').matches ||
          window.matchMedia('(color-scheme: dark)').matches ||
          document.querySelector('meta[name="color-scheme"][content="dark"]') !== null ||
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && 
          window.matchMedia('(prefers-color-scheme: dark)').matches;

        setDarkMode(isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
      } catch (error) {
        console.error('다크모드 감지 중 오류:', error);
        const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(defaultDark);
      }
    };

    checkSystemDarkMode();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('darkMode')) {
        setDarkMode(e.matches);
        localStorage.setItem('darkMode', e.matches ? 'enabled' : 'disabled');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setDarkMode]);
};

export default useSystemDarkMode;
