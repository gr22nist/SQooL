// components/editor/SqlEditor.js

import React, { useEffect, useRef, useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import QuerySection from './QuerySection';
import ResultSection from './ResultSection';
import { createDatabase, executeQuery as executeQueryApi, resetDatabase as resetDatabaseApi } from './Api';
import useStore from '@/store/useStore';
import { createSqoolTheme } from './Styles';

// 코드미러 관련 동적 임포트
const CodeMirrorImports = dynamic(() => 
  Promise.all([
    import('@codemirror/view').then(mod => {
      const theme = EditorView.theme({
        "&": {
          fontFamily: 'EliceDigitalCoding, monospace'
        }
      });
      return { 
        EditorView: mod.EditorView, 
        placeholder: mod.placeholder,
        theme 
      };
    }),
    import('@codemirror/state').then(mod => ({ EditorState: mod.EditorState })),
    import('codemirror').then(mod => ({ basicSetup: mod.basicSetup })),
    import('@codemirror/lang-sql').then(mod => ({ sql: mod.sql({ dialect: mod.SQLite }) }))
  ]).then(([view, state, codemirror, sql]) => ({
    EditorView: view.EditorView,
    placeholder: view.placeholder,
    theme: view.theme,
    EditorState: state.EditorState,
    basicSetup: codemirror.basicSetup,
    sql: sql.sql
  }))
);

/**
 * SQLEditor 컴포넌트
 * - SQL 쿼리 편집기, 쿼리 실행 및 데이터베이스 초기화 기능을 포함합니다.
 * - QuerySection과 ResultSection으로 구성되어 있으며, 이 두 컴포넌트 간의 상태 관리를 담당합니다.
 * - 초기 데이터베이스 생성과 같은 사이드 이펙트를 관리합니다.
 */
const SQLEditor = ({ 
  initialValue = '', 
  placeholder: placeholderText, 
  queryResult, 
  setQueryResult, 
  isMobile,
  isTablet,
  isEditorPage
}) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const { showToast } = useStore();
  const editorViewRef = useRef(null);
  const [queryValue, setQueryValue] = useState(initialValue);
  const [localQueryResult, setLocalQueryResult] = useState(queryResult || { columns: [], rows: [] });

  const executeQuery = useCallback((query) => {
    if (query) {
      executeQueryApi(query, setLocalQueryResult).catch((error) => {
        console.error("Query execution failed:", error);
        showToast('쿼리 실행에 실패했습니다.', 'error');
      });
    }
  }, [showToast]);

  useEffect(() => {
    if (setQueryResult) {
      setQueryResult(localQueryResult);
    }
  }, [localQueryResult, setQueryResult]);

  const resetDatabaseHandler = useCallback(() => {
    resetDatabaseApi().then(() => {
      setLocalQueryResult({ columns: [], rows: [] });
      setQueryValue('');
      if (editorViewRef.current) {
        editorViewRef.current.dispatch({
          changes: { from: 0, to: editorViewRef.current.state.doc.length, insert: '' }
        });
      }
      showToast('데이터베이스가 초기화되었습니다.', 'success');
    }).catch((error) => {
      console.error('Database reset failed:', error);
      showToast('데이터베이스 초기화에 실패했습니다.', 'error');
    });
  }, [showToast, setLocalQueryResult, setQueryValue]);

  const containerClass = `
    flex flex-col w-full
    ${isEditorPage
      ? isMobile
        ? 'gap-4'
        : isTablet
          ? 'min-h-[calc(100vh-80px)] gap-4'
          : 'gap-4'
      : isMobile
        ? 'gap-4'
        : 'h-[calc(100vh-4rem-2rem-2rem)]'}
  `;

  return (
    <section className={containerClass}>
      <QuerySection
        initialValue={queryValue}
        placeholder={placeholderText}
        executeQuery={executeQuery}
        setEditorView={(view) => {
          editorViewRef.current = view;
        }}
        resetDatabase={resetDatabaseHandler}
        isEditorPage={isEditorPage}
        setQueryValue={setQueryValue}
      />
      <ResultSection
        queryResult={localQueryResult}
        minHeight={isMobile || isEditorPage ? 'auto' : 'flex-1'}
        isMobile={isMobile}
        isEditorPage={isEditorPage}
      />
    </section>
  );
};

export default SQLEditor;
