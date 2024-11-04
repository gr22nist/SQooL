import React, { useState } from 'react';
import Dropdown from '@/components/common/Dropdown';

/**
 * 
 * CategoryList 컴포넌트
 * - 카테고리 목록을 렌더링하고, 선택된 카테고리를 강조합니다.
 * - 라이트 모드와 다크 모드를 지원하며, 사용자가 카테고리를 선택할 수 있습니다.
 * 
 * @param {Function} onSelectCategory - 카테고리 선택 시 호출되는 함수
 * @returns {JSX.Element} - 카테고리 목록을 렌더링하는 JSX 요소를 반환합니다.
 */

const CategoryList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = [
    { Id: '전체', Title: '전체', Tree: 'doc' },
    { Id: '공지사항', Title: '공지사항', Tree: 'doc' },
    { Id: '개발 팁', Title: '개발 팁', Tree: 'doc' },
    { Id: '최신이슈', Title: '최신이슈', Tree: 'doc' }
  ];

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <Dropdown
      items={categories}
      selectedId={selectedCategory}
      onSelect={handleSelect}
      placeholder="전체"
      customStyles={{
        container: 'w-full lg:w-60',
        menu: 'z-[55]'
      }}
    />
  );
};

export default CategoryList;
