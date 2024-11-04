import React from "react";
import useStore from "@/store/useStore";
import DOMPurify from "dompurify";

const ArticleDetail = ({ article }) => {
  const { isDarkMode } = useStore();

  if (!article) {
    return <div>Error loading article</div>;
  }

  const tags = Array.isArray(article.Tags) ? article.Tags : [];
  const cleanContent = DOMPurify.sanitize(article.Content);

  const container = `
    w-full max-w-none mx-auto
    px-4 py-8 sm:px-6 lg:px-8
    ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}
  `;

  const header = `
    mb-8 space-y-4
  `;

  const title = `
    text-3xl sm:text-4xl font-bold
    ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}
  `;

  const metadata = `
    flex flex-wrap items-center gap-4
    text-sm
    ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
  `;

  const tagContainer = `
    flex flex-wrap gap-2 mt-4
  `;

  const tagClass = `
    px-3 py-1 rounded-full text-sm
    transition-colors duration-200
    ${isDarkMode 
      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
  `;

  const content = `
    prose prose-lg max-w-none
    ${isDarkMode ? 'prose-invert' : ''}
    prose-headings:font-bold
    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
    prose-p:leading-relaxed
    prose-a:text-blue-500 hover:prose-a:text-blue-400
    prose-code:text-blue-500 prose-code:bg-slate-100
    ${isDarkMode ? 'prose-code:bg-slate-800' : ''}
    prose-pre:bg-slate-900
    prose-img:rounded-lg prose-img:shadow-lg
    prose-blockquote:border-l-4
    ${isDarkMode 
      ? 'prose-blockquote:border-slate-700 prose-blockquote:text-slate-400' 
      : 'prose-blockquote:border-slate-300 prose-blockquote:text-slate-600'}
  `;

  return (
    <article className={container}>
      <header className={header}>
        <h1 className={title}>{article.Title}</h1>
        <div className={metadata}>
          <time dateTime={article.Created_at}>
            {new Date(article.Created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>조회수: {article.View_count}</span>
          <span>{article.Category}</span>
        </div>
        <div className={tagContainer}>
          {tags.map((tag) => (
            <span key={tag} className={tagClass}>
              #{tag}
            </span>
          ))}
        </div>
      </header>
      <div
        dangerouslySetInnerHTML={{ __html: cleanContent }}
        className={content}
      />
    </article>
  );
};

export default ArticleDetail;
