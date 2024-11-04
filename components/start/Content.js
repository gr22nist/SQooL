import React, { useEffect, useState, useCallback } from 'react';
import { getContent } from './Api';
import useStore from '@/store/useStore';
import DOMPurify from 'dompurify';
import LoadingSpinner from '@/components/common/LoadingSpinner';

/**
 * Content 컴포넌트
 * - 주어진 documentId를 사용하여 백엔드에서 문서 데이터를 가져와 렌더링합니다.
 * - 다크 모드와 연동되어 다크 모드에 맞는 스타일을 적용합니다.
 * - 가져온 HTML 콘텐츠는 DOMPurify를 사용하여 정화한 후, Tailwind CSS의 타이포그래피 플러그인을 통해 스타일링됩니다.
 *
 * @param {string} documentId - 백엔드에서 문서 데이터를 가져오기 위한 ID
 * @returns {JSX.Element} 문서 콘텐츠를 렌더링하는 컴포넌트
 */
const Content = ({ documentId }) => {
  const { isDarkMode, showToast } = useStore();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!documentId) return;
      
      setIsLoading(true);
      try {
        const data = await getContent(documentId);
        setContent(data.document);
      } catch (error) {
        console.error('문서 가져오는 중 오류 발생:', error);
        setContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [documentId]);

  const container = `
    w-full h-full
    border rounded-lg
    ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}
  `;

  const contentHead = `
    p-6 sm:px-8 pt-6 sm:pt-8
    text-xl sm:text-2xl font-bold
    ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}
  `;

  const contentBody = `
    px-6 sm:px-8 pb-6 sm:pb-8
    overflow-y-auto
    h-[calc(100vh-4rem-2rem-4rem)] // 전체높이 - 상단여백 - 하단여백 - 제목높이
    scrollbar-thin scrollbar-thumb-rounded
    ${isDarkMode 
      ? 'scrollbar-thumb-slate-700 scrollbar-track-slate-800/50' 
      : 'scrollbar-thumb-slate-300 scrollbar-track-slate-100'}
  `;

  const copyToClipboard = useCallback(async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('코드가 복사되었습니다.', 'success');
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          textArea.remove();
          showToast('코드가 복사되었습니다.', 'success');
        } catch (err) {
          textArea.remove();
          showToast('코드 복사에 실패했습니다.', 'error');
        }
      }
    } catch (err) {
      console.error('복사 실패:', err);
      showToast('코드 복사에 실패했습니다.', 'error');
    }
  }, [showToast]);

  // DOMPurify 설정 추가
  const purifyConfig = {
    ADD_TAGS: ['pre', 'code'],
    ADD_ATTR: ['class'],
    FORBID_TAGS: [],
    FORBID_ATTR: [],
  };

  // HTML이 마운트된 후 코드 블록에 복사 버튼 추가
  useEffect(() => {
    if (!content) return;

    const codeBlocks = document.querySelectorAll('.prose pre');
    
    codeBlocks.forEach((preBlock) => {
      if (preBlock.querySelector('.copy-button')) return;
      
      preBlock.classList.add('relative');
      preBlock.style.paddingRight = '4.5rem';
      
      const button = document.createElement('button');
      button.className = `
        copy-button
        absolute top-3 right-3
        px-2 py-1
        text-xs font-medium
        rounded
        transition-colors duration-200
        ${isDarkMode 
          ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600' 
          : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'}
      `;
      button.textContent = 'Copy';
      
      button.addEventListener('click', () => {
        const codeElement = preBlock.querySelector('code');
        const codeContent = codeElement ? codeElement.textContent : preBlock.textContent;
        const cleanContent = codeContent.replace(/Copy/g, '').trim();
        copyToClipboard(cleanContent);
      });

      preBlock.appendChild(button);
    });

    return () => {
      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach(button => button.remove());
    };
  }, [content, isDarkMode, copyToClipboard]);

  if (isLoading) {
    return (
      <div className={container}>
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={container}>
        <div className="flex justify-center items-center h-full">
          <p>카테고리를 선택해주세요</p>
        </div>
      </div>
    );
  }

  const cleanContent = DOMPurify.sanitize(content.Content);

  return (
    <div className={container}>
      <h1 className={contentHead}>{content.Title}</h1>
      <div className={contentBody}>
        <div className={`
          prose prose-slate max-w-none 
          ${isDarkMode ? 'prose-invert' : ''}
          
          // 코드 블록 스타일 수정
          prose-pre:relative prose-pre:my-8 
          prose-pre:p-4 prose-pre:rounded-lg
          prose-pre:overflow-x-auto
          ${isDarkMode 
            ? 'prose-pre:bg-slate-800 prose-pre:text-slate-100' 
            : 'prose-pre:bg-slate-50 prose-pre:text-slate-900'
          }
          prose-pre:shadow-sm prose-pre:border
          ${isDarkMode ? 'prose-pre:border-slate-700' : 'prose-pre:border-slate-200'}
          
          // 기본 텍스트
          prose-p:text-base prose-p:leading-normal
          prose-p:my-6
          ${isDarkMode ? 'prose-p:text-slate-300' : 'prose-p:text-slate-600'}
          
          // 헤딩 스타일
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h2:pb-2 prose-h2:border-b
          ${isDarkMode ? 'prose-h2:border-slate-700 prose-headings:text-slate-100' : 'prose-h2:border-slate-200 prose-headings:text-slate-900'}
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          
          // 인라인 코드
          prose-code:font-normal prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5
          ${isDarkMode 
            ? 'prose-code:bg-slate-800 prose-code:text-pink-400' 
            : 'prose-code:bg-slate-100 prose-code:text-pink-600'
          }
          
          // 리스트
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:my-2 prose-li:pl-2
          ${isDarkMode ? 'prose-li:text-slate-300' : 'prose-li:text-slate-600'}
          
          // 링크
          prose-a:font-medium prose-a:transition-colors
          ${isDarkMode 
            ? 'prose-a:text-blue-400 hover:prose-a:text-blue-300' 
            : 'prose-a:text-blue-600 hover:prose-a:text-blue-500'
          }
          
          // 테이블
          prose-table:w-full prose-table:my-8 prose-table:border
          ${isDarkMode ? 'prose-table:border-slate-700' : 'prose-table:border-slate-200'}
          prose-th:p-3 prose-th:font-semibold
          ${isDarkMode 
            ? 'prose-th:bg-slate-800 prose-th:text-slate-200' 
            : 'prose-th:bg-slate-50 prose-th:text-slate-900'
          }
          prose-td:p-3 prose-td:border
          ${isDarkMode ? 'prose-td:border-slate-700' : 'prose-td:border-slate-200'}
          
          // 인용구
          prose-blockquote:my-8 prose-blockquote:pl-6 
          prose-blockquote:border-l-4
          ${isDarkMode 
            ? 'prose-blockquote:border-slate-700 prose-blockquote:text-slate-400' 
            : 'prose-blockquote:border-slate-300 prose-blockquote:text-slate-500'
          }
          prose-blockquote:italic
          
          // 이미지
          prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
          
          // 구분선
          prose-hr:my-12 
          ${isDarkMode ? 'prose-hr:border-slate-800' : 'prose-hr:border-slate-200'}
        `}
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
      </div>
    </div>
  );
};

export default Content;
