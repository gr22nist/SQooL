import { EditorView } from '@codemirror/view';

export const createSqoolTheme = (isDarkMode) => {
  return EditorView.baseTheme({
    '&': {
      backgroundColor: 'transparent',
      fontSize: '14px',
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
    },
    '.cm-gutters': {
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    '.cm-activeLine': {
      backgroundColor: isDarkMode ? '#231A2E' : '#F7EBFA',
      transition: 'background-color 0.3s ease',
    },
    '.cm-line': {
      margin: '0',
      fontFamily: "'EliceDigitalCodingver.H', monospace",
      transition: 'color 0.3s ease',
    },
    'span.ͼb': {
      color: isDarkMode ? '#C944EA' : '#A832C7',
      transition: 'color 0.3s ease',
    },
    '.cm-gutterElement': {
      fontFamily: "'EliceDigitalCodingver.H', monospace",
      height: 'auto',
      textAlign: 'center',
      padding: '8px 0',
      marginTop: '0',
      transition: 'color 0.3s ease',
    },
    '.cm-activeLineGutter': {
      backgroundColor: isDarkMode ? '#231A2E' : '#F7EBFA',
    },
    '.cm-scroller': {
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    '.cm-cursor': {
      borderLeftColor: isDarkMode ? '#f8fafc' : '#0f172a',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: isDarkMode ? '#AA55FF' : '#8A2BE2',
    },
  });
};
