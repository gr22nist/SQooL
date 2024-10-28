import React, { useState, useEffect, useCallback } from 'react';
import CategoryList from '@/components/start/Category';
import Content from '@/components/start/Content';
import SQLEditor from '@/components/editor/SqlEditor';
import ResizeHandler from '@/components/ResizeHandler';
import { HeroBtn } from '@/components/icons/IconSet';
import useStore from '@/store/useStore';
import { getCategoryList } from '@/components/start/Api';

const Start = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [editorWidth, setEditorWidth] = useState(500);
  const [documentWidth, setDocumentWidth] = useState(700);
  const [query, setQuery] = useState("");
  
  const setFullWidth = useStore((state) => state.setFullWidth); 
  const resetFullWidth = useStore((state) => state.resetFullWidth);
  const isFullWidth = useStore((state) => state.isFullWidth);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const useFullHeight = useStore((state) => state.useFullHeight);
  const totalOffset = useStore((state) => state.totalOffset);
  const setUseFullHeight = useStore((state) => state.setUseFullHeight);
  const setTotalOffset = useStore((state) => state.setTotalOffset);

  const apiInitUrl = process.env.NEXT_PUBLIC_API_INIT_URL;
  const minDocumentWidth = 320;

  useEffect(() => {
    const storedIsEditorOpen = localStorage.getItem('isEditorOpen');
    if (storedIsEditorOpen !== null) {
      setIsEditorOpen(storedIsEditorOpen === 'true');
    }
    const storedQuery = localStorage.getItem('query');
    if (storedQuery !== null) {
      setQuery(storedQuery);
    }

    const initialWidth = typeof window !== 'undefined' ? window.innerWidth - 500 : 1000;
    setDocumentWidth(initialWidth);

    setUseFullHeight(true);
    setTotalOffset(64);
  }, [setUseFullHeight, setTotalOffset]);

  useEffect(() => {
    localStorage.setItem('isEditorOpen', isEditorOpen);
    setFullWidth(isEditorOpen); 
    return () => resetFullWidth(); 
  }, [isEditorOpen, setFullWidth, resetFullWidth]);

  useEffect(() => {
    localStorage.setItem('query', query);
  }, [query]);

  const handleSelectCategory = useCallback((categoryId) => {
    setSelectedCategoryId(categoryId);
  }, []);

  const toggleEditor = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  useEffect(() => {
    if (isEditorOpen) {
      setDocumentWidth(window.innerWidth - editorWidth);
    } else {
      setDocumentWidth(window.innerWidth);
    }
  }, [isEditorOpen, editorWidth]);

  const handleResize = (newDocumentWidth) => {
    setDocumentWidth(newDocumentWidth);
    setEditorWidth(window.innerWidth - newDocumentWidth);
  };

  const container = `flex justify-center mx-auto duration-500 h-full ${useFullHeight ? `h-[calc(100vh-${totalOffset}px)]` : 'min-h-screen'} ${isFullWidth ? 'w-full px-8' : 'max-w-content-full'}`;
  const documentWrap = `flex min-w-80 flex-row justify-center flex-grow gap-4`;
  const editorWrap = `max-w-content-full min-w-quarter ${isEditorOpen ? 'flex' : 'hidden'} flex-grow`;
  const toggleBtn = `fixed w-16 h-16 flex flex-col justify-center items-center gap-1 right-12 bottom-12 rounded-lg shadow-lg hover:opacity-80 duration-300 font-bold`;
  const btnBg = isEditorOpen 
    ? (isDarkMode ? 'bg-slate-500 text-slate-900' : 'bg-slate-400 text-slate-50') 
    : (isDarkMode ? 'bg-primaryDark text-slate-900' : 'bg-primaryLight text-slate-50');
  const buttonClass = `${toggleBtn} ${btnBg}`;

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

  return (
    <section className={container}>
      <div className={documentWrap} style={{ width: documentWidth }}>
        <CategoryList 
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleSelectCategory} 
        />
        <Content documentId={selectedCategoryId} key={selectedCategoryId} />
      </div>
      {isEditorOpen && (
        <ResizeHandler
          onResize={handleResize}
          startWidth={documentWidth}
          minWidth={minDocumentWidth}
          direction="vertical"
          title="드래그로 창 크기를 조절해보세요"
        />
      )}
      <div className={editorWrap}>
        <SQLEditor placeholder="쿼리문을 입력해주세요. 예시) SELECT * FROM Artist;" />
      </div>

      <button onClick={toggleEditor} className={buttonClass}>
        <HeroBtn width={24} height={24} className={isDarkMode ? 'fill-slate-900' : 'fill-slate-50'} />
        {isEditorOpen ? '끄기' : '켜기'}
      </button>
    </section>
  );
};

export default Start;
