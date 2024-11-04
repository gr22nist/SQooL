import React, { useEffect } from 'react';
import useStore from '@/store/useStore';

const CategoryList = ({ categories, selectedCategoryId, onSelectCategory }) => {
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      const firstDocCategory = categories.find(category => category.Tree === 'doc');
      if (firstDocCategory) {
        onSelectCategory(firstDocCategory.Id);
      }
    }
  }, [categories, selectedCategoryId, onSelectCategory]);

  return (
    <div className={`
      h-full w-full
      rounded-lg border
      ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}
    `}>
      <div className={`
        h-full overflow-y-auto
        scrollbar-thin scrollbar-thumb-rounded
        ${isDarkMode 
          ? 'scrollbar-thumb-slate-700 scrollbar-track-slate-800/50' 
          : 'scrollbar-thumb-slate-300 scrollbar-track-slate-100'}
      `}>
        {categories.map(category => {
          const isSelected = selectedCategoryId === category.Id;
          const isDoc = category.Tree === 'doc';
          
          return (
            <button
              key={category.Id}
              onClick={() => isDoc && onSelectCategory(category.Id)}
              disabled={!isDoc}
              className={`
                w-full p-4 text-left text-sm font-semibold
                transition-colors duration-200
                ${!isDoc && (isDarkMode ? 'text-slate-500' : 'text-slate-400')}
                ${isDoc && 'indent-2'}
                ${isSelected && isDoc
                  ? (isDarkMode 
                      ? 'bg-primaryDark text-slate-900 font-bold' 
                      : 'bg-primaryLight text-slate-50 font-bold'
                    ) 
                  : (isDarkMode 
                      ? 'text-slate-300 hover:bg-slate-800/50 hover:text-slate-50' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )
                }
                border-b last:border-b-0
                ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'}
                ${isDoc 
                  ? (isDarkMode 
                      ? 'hover:bg-slate-800 hover:text-slate-50' 
                      : 'hover:bg-slate-50 hover:text-slate-900'
                    )
                  : ''
                }
              `}
            >
              {category.Title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
