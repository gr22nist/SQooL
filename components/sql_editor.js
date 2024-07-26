import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { sql } from '@codemirror/lang-sql';
import styles from '../styles/sql_editor.module.css';

const SQLEditor = ({ initialValue }) => {
  const [queryResult, setQueryResult] = useState({ columns: [], rows: [] });
  const editorElement = useRef(null);
  const editorView = useRef(null);

  const apiQueryUrl = process.env.NEXT_PUBLIC_API_QUERY_URL;

  useEffect(() => {
    if (editorElement.current) {
      editorView.current = new EditorView({
        extensions: [
          basicSetup,
          sql(),
          EditorView.theme({
            '&': styles.sqoolTheme,
            '&.cm-editor': styles.sqoolThemeEditor,
            '.cm-content': styles.sqoolThemeContent,
          }),
        ],
        parent: editorElement.current,
        doc: initialValue,
      });
    }

    return () => {
      if (editorView.current) {
        editorView.current.destroy();
      }
    };
  }, [initialValue]);

  const executeQuery = async () => {
    const query = editorView.current.state.doc.toString();
    console.log('Executing query:', query);

    try {
      const response = await fetch(apiQueryUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ query }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response text:', errorText);
        throw new Error('Query execution failed');
      }

      const result = await response.json();
      setQueryResult({ columns: result.columns, rows: result.result });
    } catch (error) {
      console.error('쿼리 실행 중 오류:', error);
      setQueryResult({ columns: [], rows: [] });
    }
  };

  const renderTable = (data) => {
    const { columns, rows } = data;

    if (rows.length === 0) {
      return <div>코드를 실행하면 결과가 표시됩니다.</div>;
    }

    return (
      <div className="flex justify-center">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th key={index} className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-4 border-b border-gray-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-5 box-border">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="flex flex-col w-full">
          <div className="flex flex-col border border-gray-300 rounded mb-5 overflow-hidden w-full">
            <h5 className="py-3 bg-gray-200 border-b border-gray-300 p-4 text-xl">
              SQL 코드 작성
            </h5>
            <div ref={editorElement} className="text-gray-800 bg-gray-100 font-mono text-base leading-relaxed tab-4 whitespace-pre nowrap overflow-hidden hyphens-none min-h-50 border border-gray-300 rounded p-2 w-full box-border"></div>
          </div>
          <div className="grid w-full box-border mb-3">
            <button onClick={executeQuery} className="bg-green-600 text-white p-3 text-lg cursor-pointer rounded transition duration-300 w-full box-border hover:bg-green-700">
              코드 실행(Ctrl + Enter)
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col border border-gray-300 rounded mb-5 overflow-hidden w-full">
            <h5 className="py-3 bg-gray-200 border-b border-gray-300 p-4 text-xl">
              쿼리 실행 결과
            </h5>
            <div className="p-4 overflow-auto max-h-96">
              {renderTable(queryResult)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLEditor;
