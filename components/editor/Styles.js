import { EditorView } from '@codemirror/view';

export const createSqoolTheme = (isDarkMode) => {
  const theme = EditorView.theme({
    '&': {
      backgroundColor: 'transparent',
      fontSize: '14px',
      fontFamily: 'EliceDigitalCoding, monospace',
      tabSize: '4',
      whiteSpace: 'pre-wrap',
      hyphens: 'none',
    },
    '&.cm-editor': {
      outline: 'none',
    },
    '.cm-content': {
      padding: '8px',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      fontFamily: 'EliceDigitalCoding, monospace',
      color: isDarkMode ? '#f8fafc' : '#0f172a',
    },
    '.cm-gutters': {
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
      color: isDarkMode ? '#64748b' : '#94a3b8',
    },
    '.cm-gutterElement': {
      height: 'auto',
      textAlign: 'center',
      padding: '8px 0',
      marginTop: '0',
      transition: 'color 0.3s ease',
    },
    '.cm-scroller': {
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    '.cm-activeLine': {
      backgroundColor: isDarkMode ? '#231A2E' : '#F7EBFA',
      transition: 'background-color 0.3s ease',
    },
    '.cm-activeLineGutter': {
      backgroundColor: isDarkMode ? '#231A2E' : '#F7EBFA',
    },
    '.cm-cursor': {
      borderLeftColor: isDarkMode ? '#f8fafc' : '#0f172a',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: isDarkMode ? '#AA55FF' : '#8A2BE2',
    },
    'span.ͼb': {
      color: isDarkMode ? '#C944EA' : '#A832C7',
      transition: 'color 0.3s ease',
    }
  }, {
    dark: isDarkMode
  });

  return theme;
};
