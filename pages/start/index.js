import React, { useState, useEffect, useCallback, useRef } from 'react';
import CategoryList from '@/components/start/Category';
import Content from '@/components/start/Content';
import SQLEditor from '@/components/editor/SqlEditor';
import useStore from '@/store/useStore';
import { getCategoryList } from '@/components/start/Api';
import CategoryDropdown from '@/components/start/CategoryDropdown';
import EditorToggleButton from '@/components/start/EditorToggleButton';

const Start = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [queryResult, setQueryResult] = useState({ columns: [], rows: [] });
  
  const { 
    isDarkMode,
    useFullHeight,
    totalOffset,
    isFullWidth,
    setFullWidth,
    resetFullWidth 
  } = useStore();

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallScreen(width < 1280);
      setIsCategoryOpen(width >= 1280);
      
      if (width < 768) {
        setIsEditorOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 카테고리 데이터 가져오기 (기존 로직 복원)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryList();
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
          const firstDocCategory = data.categories.find(category => category.Tree === 'doc');
          if (firstDocCategory) {
            setSelectedCategoryId(firstDocCategory.Id);
          }
        }
      } catch (error) {
        console.error('카테고리 가져오는 중 오류 발생:', error);
      }
    };
    fetchCategories();
  }, []);


  const toggleEditor = useCallback(() => {
    setIsEditorOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (isEditorOpen) {
      setFullWidth();
    } else {
      resetFullWidth();
    }
  }, [isEditorOpen, setFullWidth, resetFullWidth]);

  const container = `
    w-full min-h-[calc(100vh-${totalOffset}px)]
    px-5 pb-8
    ${!isSmallScreen && !isEditorOpen && 'flex justify-center'}
    overflow-hidden
  `;

  const contentWrapper = `
    ${isSmallScreen 
      ? 'w-full flex flex-col gap-4' 
      : `
        flex gap-4
        transition-all duration-500 ease-in-out
        ${isEditorOpen 
          ? 'w-full' 
          : 'w-full max-w-content-full'}
        relative
      `
    }
  `;

  const documentWrapper = `
    flex gap-4
    ${isSmallScreen ? 'pt-0' : 'pt-8'}
  `;

  const editorClass = `
    w-[500px] flex-shrink-0 pt-8
    h-[calc(100vh-4rem-2rem)]
    rounded-xl
    flex flex-col
    overflow-hidden
    transform
    transition-all duration-500 ease-in-out
    ${isEditorOpen 
      ? 'opacity-100 translate-x-0 relative' 
      : 'opacity-0 translate-x-full absolute right-0'
    }
  `;

  const editorToggleBtn = `
    fixed bottom-6 right-6
    p-3 rounded-full
    shadow-lg
    transition-all duration-300
    ${isDarkMode 
      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
      : 'bg-white hover:bg-slate-50 text-slate-700'}
    ${isSmallScreen ? 'hidden' : ''}
  `;

  return (
    <section className={container}>
      <div className={contentWrapper}>
        {isSmallScreen ? (
          <div className="flex flex-col gap-4 py-6">
            <div className="sticky backdrop-blur-sm">
              <CategoryDropdown 
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
              />
            </div>
            <div className="flex-1">
              <Content documentId={selectedCategoryId} key={selectedCategoryId} />
            </div>
          </div>
        ) : (
          // PC 레이아웃
          <div className={documentWrapper}>
            {/* 카테고리 영역 */}
            <div className={`
              ${isSmallScreen 
                ? 'w-full' 
                : 'w-[280px] flex-shrink-0 h-[calc(100vh-4rem-2rem-2rem)]'}
            `}>
              <CategoryList 
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
              />
            </div>

            {/* 콘텐츠 영역 */}
            <div className="flex-1 h-[calc(100vh-4rem-2rem-2rem)] overflow-hidden">
              <Content documentId={selectedCategoryId} key={selectedCategoryId} />
            </div>
          </div>
        )}

        {/* 에디터 영역 */}
        {!isSmallScreen && isEditorOpen && (
          <div className={editorClass}>
            <SQLEditor 
              placeholder="쿼리문을 입력해주세요."
              queryResult={queryResult}
              setQueryResult={setQueryResult}
              isMobile={isSmallScreen}
              isEditorPage={false}
              fullHeight={true}
            />
          </div>
        )}
      </div>

      {/* 에디터 토글 버튼 */}
      {!isSmallScreen && (
        <EditorToggleButton 
          isEditorOpen={isEditorOpen}
          onClick={toggleEditor}
        />
      )}
    </section>
  );
};

export default Start;
