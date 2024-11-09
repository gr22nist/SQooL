import React, { useState } from 'react';
import useStore from '@/store/useStore';

const EditorToggleButton = ({ isEditorOpen, onClick }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`
        fixed right-0 top-1/2 -translate-y-1/2
        flex items-center gap-2
        px-3 py-4
        rounded-l-xl
        transition-all duration-300 ease-in-out
        ${isDarkMode 
          ? 'bg-secondaryDark hover:bg-secondaryDark/90 text-slate-900' 
          : 'bg-secondaryLight hover:bg-secondaryLight/90 text-slate-50'}
        shadow-[-4px_0_12px_rgba(0,0,0,0.1)]
        hover:shadow-[-6px_0_16px_rgba(0,0,0,0.15)]
        hover:pr-5
        z-50
        group
      `}
      aria-label={isEditorOpen ? '에디터 닫기' : '에디터 열기'}
    >
      {showTooltip && (
        <div 
          className={`
            absolute bottom-full right-2
            px-2 py-1 mb-2
            text-sm whitespace-nowrap
            rounded
            ${isDarkMode 
              ? 'bg-slate-800 text-slate-200' 
              : 'bg-white text-slate-800'}
            shadow-lg
          `}
        >
          {isEditorOpen ? '에디터 닫기' : '에디터 열기'}
        </div>
      )}
      <svg
        width="20" 
        height="20" 
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform duration-300
          ${isEditorOpen ? '-rotate-180' : 'rotate-0'}
          group-hover:scale-110
        `}
      >
        {isEditorOpen ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
};

export default EditorToggleButton; 