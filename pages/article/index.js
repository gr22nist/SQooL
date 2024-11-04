import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ArticleList from "@/components/article/ArticleList";
import CategoryList from "@/components/article/CategoryList";
import { getArticleList } from "@/components/article/Api";
import useStore from "@/store/useStore";

/**
 * ArticlePage 컴포넌트
 * - 카테고리별로 게시물을 표시하는 페이지입니다.
 * - 사용자가 카테고리를 선택하고, 게시물 목록을 조회할 수 있습니다.
 *
 * @returns {JSX.Element} 카테고리와 게시물 목록을 렌더링하는 컴포넌트
 */
const ArticlePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 12;
  const router = useRouter();

  const container = `
    max-w-content-full mx-auto
    px-6 sm:px-8 lg:px-6
    min-h-screen
    flex flex-col gap-6
  `;

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const data = await getArticleList(page, perPage, selectedCategory);
        if (selectedCategory === '전체') {
          setArticles(prev => page === 1 ? data : [...prev, ...data]);
        } else {
          setArticles(data);
        }
        setHasMore(data.length === perPage);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [page, selectedCategory]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setPage(1);
    setArticles([]);
    setHasMore(true);
  };

  const handleSelectArticle = (articleId) => {
    if (articleId) {
      router.push(`/article/${articleId}`);
    }
  };

  return (
    <section className={container}>
      <CategoryList onSelectCategory={handleSelectCategory} />
      <ArticleList
        articles={articles}
        onSelectArticle={handleSelectArticle}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </section>
  );
};

export default ArticlePage;
