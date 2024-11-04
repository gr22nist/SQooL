import React, { useState, useRef, useEffect } from 'react';
import useStore from '@/store/useStore';
import { ChevronDown } from '../icons/IconSet';

const Dropdown = ({ 
  items,
  selectedId,
  onSelect,
  placeholder = '선택해주세요',
  isTree = false,
  customStyles = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const selectedItem = items?.find(item => item.Id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownClass = `
    relative w-full
    ${customStyles.container || ''}
  `;

  const buttonClass = `
    w-full
    flex items-center justify-between
    px-6 py-3.5
    rounded-lg text-sm font-medium
    transition-all duration-200 ease-in-out
    ${isDarkMode 
      ? 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80' 
      : 'bg-white text-slate-600 hover:bg-slate-50'}
    border
    ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}
  `;

  const optionsClass = `
    absolute left-0 right-0
    w-full md:w-[280px]
    py-1.5
    rounded-lg shadow-lg
    max-h-[320px] overflow-y-auto
    transform origin-top
    transition-all duration-200 ease-in-out
    ${isOpen ? 'opacity-100 scale-y-100 mt-1' : 'opacity-0 scale-y-95 -mt-1 pointer-events-none'}
    border
    ${isDarkMode 
      ? 'bg-slate-800/80 border-slate-700 scrollbar-thumb-slate-600' 
      : 'bg-white border-slate-200 scrollbar-thumb-slate-300'}
    scrollbar-thin scrollbar-track-transparent
    ${customStyles.menu || ''}
  `;

  const optionClass = (item, isSelected) => `
    w-full px-6 py-2.5
    text-left text-sm
    transition-colors duration-200
    ${!item.Tree && 'cursor-default opacity-60 font-medium'}
    ${item.Tree === 'doc' ? 'pl-8' : ''}
    ${isSelected && item.Tree === 'doc'
      ? (isDarkMode 
          ? 'bg-primaryDark text-slate-900 font-bold' 
          : 'bg-primaryLight text-white font-bold')
      : item.Tree === 'doc'
        ? (isDarkMode 
            ? 'text-slate-300 hover:bg-slate-700/50' 
            : 'text-slate-600 hover:bg-slate-50')
        : ''}
    border-b last:border-b-0
    ${isDarkMode ? 'border-slate-700/50' : 'border-slate-100'}
  `;

  return (
    <div className={dropdownClass} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClass}
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedItem?.Title || placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 flex-shrink-0
            transform transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
            ${isDarkMode ? 'fill-slate-400' : 'fill-slate-500'}`}
        />
      </button>

      {isOpen && items && (
        <ul className={optionsClass}>
          {items.map((item) => {
            const isSelected = item.Id === selectedId;
            return (
              <li
                key={item.Id}
                onClick={() => {
                  if (item.Tree === 'doc') {
                    onSelect(item.Id);
                    setIsOpen(false);
                  }
                }}
                className={optionClass(item, isSelected)}
              >
                {item.Title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;