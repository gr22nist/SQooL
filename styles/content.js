export const createContentStyles = (isDarkMode) => ({
  container: `
    w-full h-full
    border rounded-lg
    flex flex-col
    ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}
  `,
  
  contentHead: `
    p-6 sm:px-8 pt-6 sm:pt-8
    text-xl sm:text-2xl font-bold
    ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}
    border-b
    ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}
  `,
  
  contentBody: `
    flex-1
    px-6 sm:px-8 pb-6 sm:pb-8
    overflow-y-auto
    scrollbar-thin scrollbar-thumb-rounded
    ${isDarkMode 
      ? 'scrollbar-thumb-slate-700 scrollbar-track-slate-800/50' 
      : 'scrollbar-thumb-slate-300 scrollbar-track-slate-100'}
  `
}); 