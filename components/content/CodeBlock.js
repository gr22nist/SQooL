import React, { useEffect } from 'react';
import { useClipboard } from '@/hooks/useClipboard';

const CodeBlock = ({ isDarkMode, showToast }) => {
  const copyToClipboard = useClipboard(showToast);

  useEffect(() => {
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
  }, [isDarkMode, copyToClipboard]);

  return null;
};

export default CodeBlock; 