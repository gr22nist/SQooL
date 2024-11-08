export const createProseStyles = (isDarkMode) => `
  prose prose-slate max-w-none 
  ${isDarkMode ? 'prose-invert' : ''}
  
  prose-pre:relative prose-pre:my-8 
  prose-pre:p-4 prose-pre:rounded-lg
  prose-pre:overflow-x-auto
  prose-pre:shadow-sm prose-pre:border
  ${isDarkMode 
    ? 'prose-pre:bg-slate-800 prose-pre:text-slate-200 prose-pre:border-slate-700' 
    : 'prose-pre:bg-slate-50 prose-pre:text-slate-800 prose-pre:border-slate-200'}
  
  prose-code:font-normal 
  prose-code:rounded-md 
  prose-code:px-1.5 
  prose-code:py-0.5
  ${isDarkMode 
    ? 'prose-code:text-pink-400' 
    : 'prose-code:text-pink-600'}
`;
