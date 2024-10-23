import React, { useEffect, useState } from 'react';
import { getCategoryList } from './Api';
import useStore from '@/store/useStore';
import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * CategoryList 컴포넌트
 * - 카테고리 목록을 불러와서 렌더링합니다.
 * - 사용자가 카테고리를 선택하면 해당 카테고리의 ID를 상위 컴포넌트로 전달합니다.
 *
 * @param {Function} onSelectCategory - 선택된 카테고리 ID를 전달하는 콜백 함수
 */

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { isDarkMode } = useStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryList();

        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
          const firstDocCategory = data.categories.find(category => category.Tree === 'doc');
          if (firstDocCategory) {
            onSelectCategory(firstDocCategory.Id);
            setSelectedCategoryId(firstDocCategory.Id);
          }
        } else {
          console.error('Unexpected response format:', data);
          setCategories([]);
        }
      } catch (error) {
        console.error('카테고리 가져오는 중 오류 발생:', error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [onSelectCategory]);

  /**
   * 카테고리 클릭 핸들러
   * - 선택된 카테고리 ID를 상태로 설정하고, 상위 컴포넌트에 전달합니다.
   * 
   * @param {string} categoryId - 선택된 카테고리의 ID
   */

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onSelectCategory(categoryId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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