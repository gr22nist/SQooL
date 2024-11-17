import React, { useEffect, useMemo, useState, memo } from "react";
import useStore from '@/store/useStore';
import dynamic from 'next/dynamic';

/**
 * ResultSection 컴포넌트
 * - SQL 쿼리 실행 결과를 렌더링합니다.
 * - 쿼리 실행 성공 또는 실패 시 토스트 메시지를 표시하고, 결과 테이블만 렌더링합니다.
 * 
 * @param {Object} queryResult - SQL 쿼리 실행 결과 객체 (columns, rows, message, error)
 * @param {number} editorHeight - 에디터의 높이 (픽셀 단위)
 * @param {number} minHeight - 섹션의 최소 높이 (픽셀 단위)
 * @param {boolean} isMobile - 모바일 환경 여부
 */
const getStyles = (isDarkMode, isEditorPage, isMobile, isTablet, minHeight) => ({
  resultWrap: `
    w-full flex flex-col 
    ${minHeight === 'flex-1' ? 'flex-1' : ''}
    ${!isEditorPage 
      ? 'h-[calc(100%-400px)]' 
      : isMobile 
        ? 'min-h-[320px]'
        : isTablet
          ? 'min-h-[450px]'
          : 'min-h-[400px]'
    }
    rounded-xl border shadow-sm overflow-hidden
    transition-colors duration-300
    ${isDarkMode ? "border-slate-800 bg-slate-900/50" : "border-slate-200 bg-white"}
    ${isMobile ? 'mt-6' : 'mt-4'}
  `,
  resultContent: `
    ${isEditorPage ? 'flex-1' : 'h-full'}
    p-6 overflow-y-auto
    scrollbar-thin scrollbar-thumb-rounded
    ${isDarkMode 
      ? 'scrollbar-thumb-slate-700 scrollbar-track-slate-800/50' 
      : 'scrollbar-thumb-slate-300 scrollbar-track-slate-100'}
  `,
  sectionHead: `
    w-full flex items-center justify-between 
    p-4 text-sm font-bold border-b
    transition-colors duration-300
    ${isDarkMode 
      ? "border-slate-800 bg-slate-900/80 text-slate-200" 
      : "border-slate-100 bg-slate-50 text-slate-700"}
  `,
  emptyStateText: `
    text-center font-medium
    transition-colors duration-300
    ${isDarkMode ? "text-slate-400" : "text-slate-500"}
  `,
  scrollTopButton: (showScrollTop) => `
    fixed bottom-8 right-8
    p-3 rounded-full shadow-lg
    transition-all duration-300
    ${isDarkMode 
      ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' 
      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}
    hover:shadow-xl z-70
    ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
  `
});

// LoadingTable을 메모이제이션
const LoadingTable = memo(() => (
  <div className="w-full animate-pulse">
    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-6 bg-slate-100 dark:bg-slate-800 rounded" />
      ))}
    </div>
  </div>
));

LoadingTable.displayName = 'LoadingTable';

const DynamicDataTable = dynamic(
  () => import('./table/DataTable'),
  { 
    loading: () => <LoadingTable />,
    ssr: false
  }
);

const ResultContent = memo(({ queryResult, isDarkMode, isMobile, styles }) => {
  if (!queryResult?.columns?.length) {
    return <div className={styles.emptyStateText}>쿼리를 실행하면 결과가 여기에 표시됩니다.</div>;
  }

  return (
    <DynamicDataTable 
      columns={queryResult.columns} 
      rows={queryResult.rows} 
      isDarkMode={isDarkMode}
      isMobile={isMobile} 
    />
  );
});

ResultContent.displayName = 'ResultContent';

const ResultSection = ({ queryResult, minHeight, isMobile, isEditorPage, isTablet }) => {
  const { isDarkMode, showToast } = useStore();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (queryResult?.error) {
      showToast(queryResult.error, 'error');
    } else if (queryResult?.message) {
      showToast(queryResult.message, 'success');
    }
  }, [queryResult, showToast]);

  useEffect(() => {
    if (!isEditorPage) return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEditorPage]);

  const styles = useMemo(() => 
    getStyles(isDarkMode, isEditorPage, isMobile, isTablet, minHeight),
    [isDarkMode, isEditorPage, isMobile, isTablet, minHeight]
  );

  return (
    <section className={styles.resultWrap}>
      <div className={styles.sectionHead}>
        <span>실행 결과</span>
        {queryResult?.rows?.length > 0 && (
          <span className="text-xs font-bold text-slate-500 text-center sm:text-right">
            {queryResult.rows.length}개의 결과
          </span>
        )}
      </div>
      <div className={styles.resultContent}>
        <ResultContent 
          queryResult={queryResult}
          isDarkMode={isDarkMode}
          isMobile={isMobile}
          styles={styles}
        />
      </div>
      {isEditorPage && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.scrollTopButton(showScrollTop)}
          aria-label="맨 위로 이동"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </section>
  );
};

export default memo(ResultSection);