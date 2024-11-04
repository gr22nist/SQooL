import React, { useState, useRef, useCallback } from 'react';
import ArticleCard from './ArticleCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useStore from '@/store/useStore';

const ArticleList = ({ articles, onSelectArticle, isLoading, hasMore, onLoadMore }) => {
  const { isDarkMode } = useStore();
  const observerRef = useRef();
  const [loadingMore, setLoadingMore] = useState(false);

  const lastArticleRef = useCallback(node => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setLoadingMore(true);
        onLoadMore().finally(() => setLoadingMore(false));
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, onLoadMore]);

  if (isLoading && articles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && articles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] font-bold">
        게시된 아티클이 없습니다
      </div>
    );
  }

  const container = `
    flex flex-col gap-8
  `;

  const articleGrid = `
    grid gap-4
    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  `;

  return (
    <div className={container}>
      <div className={articleGrid}>
        {articles.map((article, index) => (
          <div 
            key={article.Id}
            ref={index === articles.length - 1 ? lastArticleRef : null}
          >
            <ArticleCard 
              article={article} 
              onSelectArticle={onSelectArticle} 
            />
          </div>
        ))}
      </div>
      {(loadingMore || (isLoading && articles.length > 0)) && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ArticleList;
