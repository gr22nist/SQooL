// hooks/useEditor.js
import { useRef, useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { sql, SQLite } from '@codemirror/lang-sql';
import { autocompletion } from '@codemirror/autocomplete';
import { keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { placeholder } from '@codemirror/view';
import { createSqoolTheme } from '@/components/editor/Styles';
import { sqliteCompletion } from '@/components/editor/SqliteKeywords';

/**
 * useEditor 훅
 * - CodeMirror 에디터를 설정하고 초기화합니다.
 * - 다크 모드 및 SQL 자동완성 기능을 설정합니다.
 */

const useEditor = (initialValue, isDarkMode, setEditorView, isMobile) => {
  const editorElement = useRef(null);
  const editorView = useRef(null);

  useEffect(() => {
    if (editorView.current) {
      editorView.current.destroy();
      editorView.current = null;
    }

    if (!editorElement.current) return;

    const state = EditorState.create({
      doc: initialValue || "",
      extensions: [
        basicSetup,
        sql({ dialect: SQLite }),
        createSqoolTheme(isDarkMode),
        autocompletion({ override: [sqliteCompletion] }),
        keymap.of(defaultKeymap),
        EditorView.lineWrapping,
        placeholder("쿼리문을 입력해주세요.\n예시) SELECT * FROM Artist;"),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const doc = update.state.doc.toString();
          }
        })
      ]
    });

    editorView.current = new EditorView({
      state,
      parent: editorElement.current
    });

    if (setEditorView) {
      setEditorView(editorView.current);
    }

    return () => {
      if (editorView.current) {
        editorView.current.destroy();
        editorView.current = null;
      }
    };
  }, [initialValue, isDarkMode, isMobile, setEditorView]);

  return editorElement;
};
export default useEditor;

