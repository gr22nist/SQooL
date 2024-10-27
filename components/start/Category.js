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

  const handleCategoryClick = (categoryId) => {
    onSelectCategory(categoryId);
  };

  const container = `min-w-60 h-full flex flex-col rounded-lg border-1 overflow-y-auto scrollbar-hide ${isDarkMode ? "border-slate-800" : "border-slate-200"}`;
  const catagoryItem = `p-4 border-b-1 ${isDarkMode ? "border-slate-800" : "border-slate-200"} duration-500`;
  
  return (
    <div className={container}>
      <ul>
        {categories.map(category => {
          const isSelected = selectedCategoryId === category.Id;
          const treeClass = category.Tree === 'doc' ? 'cursor-pointer indent-2' : 'cursor-default text-slate-400';
          const selectedClass = isSelected ? (isDarkMode ? 'bg-primaryDark text-slate-900 font-bold' : 'bg-primaryLight text-slate-50 font-bold') : '';
          const hoverClass = category.Tree === 'doc' ? (isDarkMode ? 'hover:bg-secondaryDark hover:text-slate-900 font-bold' : 'hover:bg-secondaryLight hover:text-slate-50 font-bold') : '';

          return (
            <li 
              key={category.Id} 
              className={`${catagoryItem} ${treeClass} ${selectedClass} ${hoverClass}`}
              onClick={() => category.Tree === 'doc' && handleCategoryClick(category.Id)}
            >
              {category.Title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
