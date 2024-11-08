export const createProseStyles = (isDarkMode) => `
  prose prose-slate max-w-none 
  ${isDarkMode ? 'prose-invert' : ''}
  
  prose-pre:relative prose-pre:my-8 
  prose-pre:p-4 prose-pre:rounded-lg
  prose-pre:overflow-x-auto
  ${isDarkMode 
    ? 'prose-pre:bg-slate-800 prose-pre:text-slate-100' 
    : 'prose-pre:bg-slate-50 prose-pre:text-slate-900'
  }
  prose-pre:shadow-sm prose-pre:border
  ${isDarkMode ? 'prose-pre:border-slate-700' : 'prose-pre:border-slate-200'}
  
  prose-p:text-base
  ${isDarkMode ? 'prose-p:text-slate-300' : 'prose-p:text-slate-600'}
  
  prose-headings:font-bold prose-headings:tracking-tight
  prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
  prose-h2:pb-2 prose-h2:border-b
  ${isDarkMode ? 'prose-h2:border-slate-700 prose-headings:text-slate-100' : 'prose-h2:border-slate-200 prose-headings:text-slate-900'}
  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
  
  prose-code:font-normal prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-transparent
  ${isDarkMode 
    ? 'prose-code:text-pink-400' 
    : 'prose-code:text-pink-600'
  }
  
  prose-ul:my-2 prose-ul:list-disc prose-ul:pl-6
  prose-ol:list-decimal prose-ol:pl-6
  prose-li:pl-2
  ${isDarkMode ? 'prose-li:text-slate-300' : 'prose-li:text-slate-600'}
  
  prose-a:font-medium prose-a:transition-colors
  ${isDarkMode 
    ? 'prose-a:text-blue-400 hover:prose-a:text-blue-300' 
    : 'prose-a:text-blue-600 hover:prose-a:text-blue-500'
  }
`;
