import React from "react";
import useStore from "@/store/useStore";
import Image from "next/image";

const ArticleCard = ({ article, onSelectArticle }) => {
  const tags = Array.isArray(article.Tags) ? article.Tags : [];
  const { isDarkMode } = useStore();

  const container = `
    group
    cursor-pointer
    flex flex-col
    rounded-xl border
    overflow-hidden
    transition-all duration-300
    hover:shadow-lg
    ${isDarkMode 
      ? "bg-slate-800/50 border-slate-800 hover:bg-slate-800" 
      : "bg-white border-slate-200 hover:bg-slate-50"}
  `;

  const imageWrap = `
    relative
    w-full
    aspect-square
    overflow-hidden
  `;

  const content = `
    flex flex-col gap-2
    p-4
  `;

  const title = `
    text-base font-bold
    line-clamp-2
    transition-colors duration-300
    group-hover:text-primary${isDarkMode ? 'Dark' : 'Light'}
  `;

  const metaData = `
    flex items-center gap-2
    text-sm
    ${isDarkMode ? "text-slate-400" : "text-slate-500"}
  `;

  const tagList = `
    flex flex-wrap gap-1
  `;

  const tagItem = `
    text-xs px-2 py-1 
    rounded-full
    font-bold
    ${isDarkMode 
      ? "bg-primaryDark text-slate-900" 
      : "bg-primaryLight text-slate-50"}
  `;

  return (
    <div className={container} onClick={() => onSelectArticle(article.Id)}>
      <div className={imageWrap}>
        <Image
          src={article.Thumbnail || '/img/article_img.jpg'}
          alt={article.Title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          quality={75}
        />
      </div>
      <div className={content}>
        <h2 className={title}>{article.Title}</h2>
        <div className={metaData}>
          <span>{new Date(article.Created_at).toLocaleDateString()}</span>
          <span>조회 {article.View_count}</span>
        </div>
        <div className={tagList}>
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className={tagItem}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
