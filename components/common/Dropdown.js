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
    relative w-full z-50
    ${customStyles.container || ''}
  `;

  const buttonClass = `
    w-full
    flex items-center justify-between
    px-6 py-4
    text-sm font-bold
    transition-all duration-200 ease-in-out
    ${isDarkMode 
      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700/80' 
      : 'bg-white text-slate-600 hover:bg-slate-100'}
    border
    ${isOpen 
      ? `rounded-t-lg ${isDarkMode 
          ? 'border-slate-700 border-b-0' 
          : 'border-slate-200 border-b-0'}`
      : `rounded-lg ${isDarkMode 
          ? 'border-slate-700' 
          : 'border-slate-200'}`
    }
  `;

  const optionsClass = `
    absolute left-0 right-0
    w-full
    rounded-b-lg
    max-h-[320px] overflow-y-auto
    transform origin-top
    transition-all duration-200 ease-in-out
    ${isOpen 
      ? 'opacity-100 scale-y-100 translate-y-0 visible' 
      : 'opacity-0 scale-y-90 -translate-y-1 invisible'}
    border
    ${isDarkMode 
      ? 'bg-slate-800/95 border-slate-700' 
      : 'bg-white border-slate-200'}
    scrollbar-thin scrollbar-track-transparent
    ${customStyles.menu || ''}
  `;

  const optionClass = (item, isSelected) => `
    w-full px-6 py-4
    text-left text-sm
    transition-colors duration-200
    ${!item.Tree && 'opacity-60'}
    ${item.Tree === 'doc' ? 'pl-10 cursor-pointer font-bold' : ''}
    ${isSelected && item.Tree === 'doc'
      ? (isDarkMode 
          ? 'bg-primaryDark text-slate-900 font-bold' 
          : 'bg-primaryLight text-white font-bold')
      : item.Tree === 'doc'
        ? (isDarkMode 
            ? 'text-slate-300 hover:bg-slate-900' 
            : 'text-slate-600 hover:bg-slate-50')
        : ''}
    border-b last:border-b-0
    ${isDarkMode ? 'border-slate-900/90' : 'border-slate-100'}
  `;

  return (
    <div className={dropdownClass} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClass}
        aria-expanded={isOpen}
      >
        <span className={`truncate font-bold ${!selectedItem?.Title && 'opacity-0'}`}>
          {selectedItem?.Title || placeholder}
        </span>
        <ChevronDown 
          className={`w-5 h-4 flex-shrink-0 ml-2
            transform transition-transform duration-200
            ${isOpen ? 'rotate-180' : 'rotate-0'}
            ${isDarkMode ? 'fill-slate-400' : 'fill-slate-500'}`}
        />
      </button>

      <ul className={optionsClass}>
        {items?.map((item) => {
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
    </div>
  );
};

export default Dropdown;