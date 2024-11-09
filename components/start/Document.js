import React, { useEffect, useMemo } from 'react';
import CategoryDropdown from './CategoryDropdown';
import Content from './Content';
import useStore from '@/store/useStore';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useCategories } from '@/hooks/useCategories';

const SELECTED_CATEGORY_KEY = 'selectedDocCategory';

const Document = ({ showEditor }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { categories, isLoading } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const { isDarkMode, totalOffset } = useStore();

  const filteredCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return categories.filter(category => 
      category.Tree === 'doc' || category.Tree === 'main'
    );
  }, [categories]);

  useEffect(() => {
    if (!isLoading && filteredCategories.length > 0) {
      const savedCategoryId = localStorage.getItem(SELECTED_CATEGORY_KEY);
      
      if (savedCategoryId) {
        const categoryExists = filteredCategories.some(cat => cat.Id === savedCategoryId);
        if (categoryExists) {
          setSelectedCategoryId(savedCategoryId);
          return;
        }
      }
      
      if (!selectedCategoryId) {
        const firstDocCategory = filteredCategories.find(category => category.Tree === 'doc');
        if (firstDocCategory) {
          setSelectedCategoryId(firstDocCategory.Id);
        }
      }
    }
  }, [filteredCategories, isLoading, selectedCategoryId]);

  const handleCategorySelect = (categoryId) => {
    localStorage.setItem(SELECTED_CATEGORY_KEY, categoryId);
    setSelectedCategoryId(categoryId);
  };

  const documentClass = `
    flex flex-col gap-4
    w-full h-full 
    sm:px-4
    ${showEditor && isDesktop 
      ? 'xl:max-w-[calc(1200px-504px)] xl:px-0 xl:min-h-[calc(100vh-${totalOffset}px)] xl:overflow-y-auto' 
      : ''}
    ${!isDesktop && 'w-full min-h-full'}
    mx-auto
    transition-all duration-300 ease-in-out
  `;

  const dropdownClass = `
    z-50
    w-full
  `;

  const contentClass = `
    w-full h-full
    overflow-auto
  `;

  return (
    <div className={documentClass}>
      <div className={dropdownClass}>
        <CategoryDropdown 
          categories={filteredCategories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleCategorySelect}
        />
      </div>
      <div className={contentClass}>
        <Content documentId={selectedCategoryId} />
      </div>
    </div>
  );
};

export default Document;