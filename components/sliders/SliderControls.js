import React from 'react';
import { SlidePlay, SlidePause } from'../icons/IconSet';
import useStore from '@/store/useStore';

const SliderControls = ({ currentSlide, slides, isPlaying, togglePlayPause, handleIndicatorClick }) => {
  const { isDarkMode } = useStore();

  const controlContainer = `
    flex gap-3 items-center justify-center
    pb-8
    rounded-full
    backdrop-blur-sm
    transition-colors duration-200
  `;

  const indicatorStyle = `
    w-6 h-6
    flex items-center justify-center
    text-xs
    transition-colors duration-200
    ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}
    hover:${isDarkMode ? 'text-slate-100' : 'text-slate-900'}
    border-none 
    cursor-pointer
  `;

  const activeIndicatorStyle = `
    font-extrabold
    ${isDarkMode ? 'text-primaryDark' : 'text-primaryLight'}
  `;

  return (
    <div className={controlContainer}>
      {slides.map((_, index) => (
        <button
          key={index}
          className={`${indicatorStyle} ${index + 1 === currentSlide ? activeIndicatorStyle : ''}`}
          onClick={() => handleIndicatorClick(index)}
        >
          {index + 1}
        </button>
      ))}
      <button 
        onClick={togglePlayPause} 
        className="bg-transparent border-none cursor-pointer"
        aria-label={isPlaying ? "슬라이드 일시정지" : "슬라이드 재생"}
      >
        {isPlaying 
          ? <SlidePause width={24} height={24} className={`fill-current ${isDarkMode ? 'text-slate-300 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'}`} /> 
          : <SlidePlay width={24} height={24} className={`fill-current ${isDarkMode ? 'text-slate-300 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900'}`} />
        }
      </button>
    </div>
  );
};

export default SliderControls;