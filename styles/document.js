export const documentStyles = ({ showEditor }) => `
  h-full
  transition-all duration-300 ease-in-out
  ${showEditor ? 'w-[calc(50%-1rem)]' : 'max-w-content-full'}
`;

export const categoryStyles = `
  w-full mb-6
`;

export const contentStyles = ({ layout }) => `
  w-full
  ${layout === 'mobile' 
    ? 'h-[calc(100vh-16rem)]' 
    : 'h-[calc(100vh-10rem)] overflow-y-auto'}
  scrollbar-thin scrollbar-thumb-rounded
  ${isDarkMode 
    ? 'scrollbar-thumb-slate-700 scrollbar-track-slate-800/50' 
    : 'scrollbar-thumb-slate-300 scrollbar-track-slate-100'}
`; 