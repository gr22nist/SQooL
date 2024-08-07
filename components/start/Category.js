// components/start/Category.js
import React, { useEffect, useState } from 'react';
import { getCategoryList } from './Api';
import useDarkMode from '../../hooks/useDarkMode';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryList();
        console.log('카테고리 데이터:', data);

        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
          const firstDocCategory = data.categories.find(category => category.Tree === 'doc');
          if (firstDocCategory) {
            onSelectCategory(firstDocCategory.Id); // 첫 번째 "doc" 카테고리 선택
          }
        } else {
          console.error('Unexpected response format:', data);
          setCategories([]);  // 기본값을 빈 배열로 설정
        }
      } catch (error) {
        console.error('카테고리 가져오는 중 오류 발생:', error);
        setCategories([]);  // 에러 발생 시 빈 배열로 설정
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []); // 빈 의존성 배열로 한 번만 호출되도록 설정

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full min-w-fit h-full flex flex-col rounded-lg border-1 overflow-y-scroll ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
      <ul>
        {categories.map(category => (
          <li 
            key={category.Id} 
            className={`p-2 border-b border-slate-400 ${category.Tree === 'doc' ? 'cursor-pointer' : 'cursor-not-allowed text-gray-500'}`}
            onClick={() => category.Tree === 'doc' && onSelectCategory(category.Id)}
          >
            {category.Title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;