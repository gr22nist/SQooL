import React, { useEffect } from 'react';
import { useClipboard } from '@/hooks/useClipboard';

const CodeBlock = ({ isDarkMode, showToast }) => {
  const copyToClipboard = useClipboard(showToast);

  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.prose pre');
    
    const updateCodeBlocks = () => {
      codeBlocks.forEach((preBlock) => {
        if (preBlock.querySelector('.copy-button-container')) return;
        
        preBlock.classList.remove('bg-slate-800', 'text-slate-200', 'bg-slate-50', 'text-slate-900');
        preBlock.classList.add(
          ...(isDarkMode 
            ? ['bg-slate-100', 'text-slate-900'] 
            : ['bg-slate-800', 'text-slate-200'])
        );
        
        const container = document.createElement('div');
        container.className = 'copy-button-container relative';
        
        preBlock.parentNode.insertBefore(container, preBlock);
        container.appendChild(preBlock);
        
        const button = document.createElement('button');
        button.className = `
          copy-button
          absolute top-3 right-3
          px-2 py-1
          text-xs font-bold
          rounded
          transition-colors duration-200
          z-10
          ${isDarkMode 
            ? 'bg-slate-700/80 hover:bg-slate-600 text-slate-300 border border-slate-600' 
            : 'bg-slate-200/80 hover:bg-slate-300 text-slate-600 border border-slate-300'}
        `;
        button.textContent = 'Copy';
        
        button.addEventListener('click', () => {
          const codeElement = preBlock.querySelector('code');
          const codeContent = codeElement ? codeElement.textContent : preBlock.textContent;
          const cleanContent = codeContent.trim();
          copyToClipboard(cleanContent);
        });

        container.appendChild(button);
      });
    };

    updateCodeBlocks();

    const observer = new MutationObserver(() => {
      updateCodeBlocks();
    });

    document.querySelectorAll('.prose').forEach(element => {
      observer.observe(element, {
        attributes: true,
        subtree: true,
        childList: true,
        characterData: true
      });
    });

    return () => {
      observer.disconnect();
      const containers = document.querySelectorAll('.copy-button-container');
      containers.forEach(container => {
        const preBlock = container.querySelector('pre');
        if (preBlock) {
          container.parentNode.insertBefore(preBlock, container);
        }
        container.remove();
      });
    };
  }, [isDarkMode, copyToClipboard]);

  return null;
};

export default CodeBlock; 