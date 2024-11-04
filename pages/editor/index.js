import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import useStore from '@/store/useStore';

// 로딩 컴포넌트
const LoadingEditor = () => (
  <div className="w-full h-[60vh] animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg" />
);

// SQLEditor 컴포넌트를 동적으로 import
const DynamicSQLEditor = dynamic(
  () => import('@/components/editor/SqlEditor'),
  { 
    loading: () => <LoadingEditor />,
    ssr: false // CodeMirror는 클라이언트 사이드에서만 동작
  }
);

/**
 * Editor 컴포넌트
 * - SQL 편집기 화면을 렌더링합니다.
 * - 초기 로딩 시, API를 통해 데이터베이스를 생성합니다.
 * - SQL 쿼리 결과를 보여주기 위해 상태를 관리합니다.
 */
const Editor = () => {
  const totalOffset = useStore((state) => state.totalOffset); 
  const [queryResult, setQueryResult] = useState({ columns: [], rows: [] });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const container = `
    max-w-content-full mx-auto
    ${isMobile 
      ? ''
      : `min-h-[calc(100vh-${totalOffset}px)]`}
    px-6 sm:px-8 lg:px-6
    py-8
  `;

  return (
    <section className={container}>
      <DynamicSQLEditor
        placeholder="쿼리문을 입력해주세요. 예시) SELECT * FROM Artist;"
        queryResult={queryResult}
        setQueryResult={setQueryResult}
        isMobile={isMobile}
        isEditorPage={true}
      />
    </section>
  );
}

export default Editor;
