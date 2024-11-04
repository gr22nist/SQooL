import React, { useState } from 'react';
import CategoryList from './Category';
import Content from './Content';
import { useStore } from '../../store/store';

const Document = ({ onSelectCategory, selectedCategoryId }) => {
  const { isDarkMode } = useStore();

  return (
    <section className="w-full h-full flex gap-6">
      {/* 카테고리 영역 */}
      <div className="w-[280px] flex-shrink-0 h-[calc(100vh-4rem-2rem)]">
        <CategoryList 
          onSelectCategory={onSelectCategory}
          selectedCategoryId={selectedCategoryId}
        />
      </div>

      {/* 문서 영역 */}
      <div className={`
        flex-1 h-[calc(100vh-4rem-2rem)]
        overflow-y-auto
        scrollbar-thin scrollbar-thumb-rounded
        ${isDarkMode 
          ? 'scrollbar-thumb-slate-700 scrollbar-track-slate-800/50' 
          : 'scrollbar-thumb-slate-300 scrollbar-track-slate-100'}
      `}>
        <div className="min-h-full">
          {selectedCategoryId ? (
            <Content documentId={selectedCategoryId} />
          ) : (
            <div className="h-full flex justify-center items-center">
              카테고리를 선택해주세요
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Document;