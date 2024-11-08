import React from 'react';
import DOMPurify from 'dompurify';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CodeBlock from '@/components/content/CodeBlock';
import { useContent } from '@/hooks/useContent';
import { createContentStyles } from '@/styles/content';
import { createProseStyles } from '@/styles/prose';
import useStore from '@/store/useStore';

const Content = ({ documentId }) => {
  const { isDarkMode, showToast } = useStore();
  const { content, isLoading } = useContent(documentId);
  const styles = createContentStyles(isDarkMode);
  const proseStyles = createProseStyles(isDarkMode);

  if (isLoading) {
    return (
    <div className={styles.container}>
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    </div>
    );
  }

  if (!content) {
    return (
      <div className={styles.container}>
        <div className="flex justify-center items-center h-full">
          <p>카테고리를 선택해주세요</p>
        </div>
      </div>
    );
  }

  const cleanContent = DOMPurify.sanitize(content.Content, {
    ADD_TAGS: ['pre', 'code'],
    ADD_ATTR: ['class'],
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.contentHead}>{content.Title}</h1>
      <div className={styles.contentBody}>
        <div 
          className={proseStyles}
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
        <CodeBlock isDarkMode={isDarkMode} showToast={showToast} />
      </div>
    </div>
  );
};

export default Content;
