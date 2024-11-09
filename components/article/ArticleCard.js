import React, { useState, useMemo } from "react";
import useStore from "@/store/useStore";
import Image from "next/image";

const ArticleCard = ({ article, onSelectArticle }) => {
  const tags = Array.isArray(article.Tags) ? article.Tags : [];
  const { isDarkMode } = useStore();
  const [imageError, setImageError] = useState(false);

  // 기본 썸네일 경로
  const defaultThumbnail = '/img/article_img.jpg';

  // 썸네일 URL 처리
  const thumbnailUrl = useMemo(() => {
    if (!article.Thumbnail || imageError) {
      return defaultThumbnail;
    }
    return article.Thumbnail.startsWith('http') 
      ? article.Thumbnail 
      : `${process.env.NEXT_PUBLIC_API_URL}/static/Uploads/${article.Thumbnail}`;
  }, [article.Thumbnail, imageError]);

  const handleImageError = () => {
    setImageError(true);
  };

  const container = `
    article-card 
    w-full 
    flex flex-col 
    rounded-lg 
    overflow-hidden
    border
    cursor-pointer
    transition-all duration-300
    hover:shadow-lg
    ${isDarkMode 
      ? "bg-slate-800 border-slate-700 hover:bg-slate-700" 
      : "bg-white border-slate-200 hover:bg-slate-50"}
  `;

  const content = `
    flex flex-col gap-2
    p-4
  `;

  const metaData = `
    flex items-center gap-4
    text-sm
    ${isDarkMode ? "text-slate-400" : "text-slate-500"}
  `;

  const tagList = `
    flex flex-wrap gap-2
  `;

  const tagItem = `
    text-xs px-4 py-2 
    rounded-full
    font-bold
    ${isDarkMode 
      ? "bg-slate-50 text-slate-900" 
      : "bg-slate-900 text-slate-50"}
  `;

  return (
    <div className={container} onClick={() => onSelectArticle(article.Id)}>
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={article.Title || '게시글 썸네일'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={handleImageError}
          priority={false}
        />
      </div>
      <div className={content}>
        <h2 className="text-xl font-bold">{article.Title}</h2>
        <div className={metaData}>
          <span>{article.Category}</span>
          <span>{new Date(article.Created_at).toLocaleDateString()}</span>
          <span>조회수: {article.View_count}</span>
        </div>
        {article.Description && (
          <p className="text-sm line-clamp-2">{article.Description}</p>
        )}
        <div className={tagList}>
          {tags.map(tag => (
            <span key={tag} className={tagItem}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
