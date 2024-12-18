import React from 'react';
import useStore from'@/store/useStore';
import { DarkToggle, LightToggle } from '../icons/IconSet';


const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useStore((state) => ({
  isDarkMode: state.isDarkMode,
  toggleDarkMode: state.toggleDarkMode,
  }));

  const toggleBtn = `p-1 rounded-lg hover:animate-pulse duration-500 ${isDarkMode ? 'bg-secondaryDark' : 'bg-secondaryLight'}`;

  return (
  <button onClick={toggleDarkMode} className={toggleBtn}>
      {isDarkMode ? (
        <DarkToggle width={24} height={24} title="Dark Mode" />
      ) : (
        <LightToggle width={24} height={24} title="Light Mode" />
      )}
  </button>
  );
};

export default DarkModeToggle;