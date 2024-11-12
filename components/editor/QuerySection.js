// components/editor/QuerySection.js
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import useStore from "../../store/useStore";
import useEditor from "@/hooks/useEditor";
import { CodeCopy, DBReset, ChevronDown, ChevronUp } from "../icons/IconSet";

const DB_CONFIGS = {
  "K-idol": { label: "한국아이돌 DB", defaultQuery: "SELECT * FROM Artist;" },
  "K-movie": { label: "한국영화 DB", defaultQuery: "SELECT * FROM Movie;" }
};

/**
 * QuerySection 컴포넌트
 * - SQL 쿼리 작성, 실행, 데이터베이스 초기화 기능을 담당합니다.
 * - 부모 컴포넌트에서 전달된 상태와 함수를 사용하여 상호작용합니다.
 */
const QuerySection = ({
  initialValue,
  executeQuery,
  minHeight = 400,
  setEditorView,
  resetDatabase,
  isEditorPage,
  setQueryValue
}) => {

  const [selectedDB, setSelectedDB] = useState("K-idol");
  const { isDarkMode, showToast } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const calculatedHeight = useMemo(() => {
    if (isMobile) return 320;
    return isExpanded ? 600 : 320;
  }, [isMobile, isExpanded]);

  const ChevronIcon = ({ expanded }) =>
    expanded ? (
      <ChevronUp
        className={`
          w-6 h-6
          transition-colors duration-300
          ${isDarkMode ? "fill-slate-300" : "fill-slate-600"}
        `}
      />
    ) : (
      <ChevronDown
        className={`
          w-6 h-6
          transition-colors duration-300
          ${isDarkMode ? "fill-slate-300" : "fill-slate-600"}
        `}
      />
    );

  const queryWrap = `
    w-full flex flex-col 
    rounded-xl border
    shadow-sm
    transition-colors duration-300
    ${
      isDarkMode
        ? "border-slate-800 bg-slate-900/50"
        : "border-slate-200 bg-white"
    }
  `;

  const sectionHead = `
    flex flex-col
    items-start
    justify-between
    gap-3
    p-4
    border-b
    ${isDarkMode ? "border-slate-700" : "border-slate-200"}
    ${isEditorPage && !isMobile ? "sm:flex-row sm:items-center" : ""}
  `;

  const dbSelectWrapper = `
    flex flex-col
    items-start
    gap-2
    text-sm font-bold
    w-full
    ${isEditorPage && !isMobile ? "sm:flex-row sm:items-center sm:w-auto" : ""}
  `;

  const dbSelect = `
    w-full
    px-3 py-2 
    rounded-lg 
    text-sm font-bold
    ${isDarkMode 
      ? "bg-slate-800 text-slate-300 border-slate-700" 
      : "bg-slate-100 text-slate-600 border-slate-200"}
    border
    ${isEditorPage && !isMobile ? "sm:w-auto" : ""}
  `;

  const buttonGroup = `
    flex flex-wrap
    items-center 
    gap-2
    w-full
    justify-end
    ${isEditorPage && !isMobile ? "sm:w-auto" : ""}
  `;

  const editorBtn = `
    flex items-center justify-center
    gap-2
    px-3 py-2
    rounded-lg
    text-sm font-bold
    transition-colors duration-300
    ${isDarkMode 
      ? "bg-slate-800 hover:bg-slate-700 text-slate-200" 
      : "bg-slate-100 hover:bg-slate-200 text-slate-700"}
    flex-1
    ${isEditorPage && !isMobile ? "sm:flex-none" : ""}
  `;

  const editorIcon = `
    w-6 h-6
    transition-colors duration-300
    ${isDarkMode ? "fill-slate-300" : "fill-slate-600"}
  `;

  const queryBtn = `
    w-full 
    py-4
    mt-2 
    rounded-b-xl
    font-bold
    transition-all duration-300
    ${
      isDarkMode
        ? "bg-primaryDark text-slate-900 hover:bg-secondaryDark"
        : "bg-primaryLight text-white hover:bg-secondaryLight"
    }
    hover:shadow-md
    disabled:opacity-50 
    disabled:cursor-not-allowed
  `;

  const handleDBChange = async (dbName) => {
    try {
      setSelectedDB(dbName);
      
      // DB 초기화
      await fetch(process.env.NEXT_PUBLIC_API_INIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dbname: dbName }),
        credentials: 'include',
      });

      // 에디터 쿼리 업데이트
      if (editorRef.current) {
        const defaultQuery = DB_CONFIGS[dbName].defaultQuery;
        editorRef.current.dispatch({
          changes: { 
            from: 0, 
            to: editorRef.current.state.doc.length, 
            insert: defaultQuery 
          }
        });
        setQueryValue(defaultQuery);
      }
      
      showToast(`${DB_CONFIGS[dbName].label}로 전환되었습니다.`, "success");
    } catch (error) {
      console.error('DB 전환 실패:', error);
      showToast("DB 전환에 실패했습니다.", "error");
    }
  };
  const handleCopyCode = async () => {
    if (!editorRef.current) return;
    
    try {
      const code = editorRef.current.state.doc.toString();
      await navigator.clipboard.writeText(code);
      showToast("코드를 복사했습니다.", "success");
    } catch (err) {
      console.error("코드 복사 실패:", err);
      showToast("코드 복사에 실패했습니다.", "error");
    }
  };

  const resultContent = `
    flex-1 overflow-y-auto
    scrollbar-thin scrollbar-thumb-rounded
    ${isDarkMode 
      ? 'scrollbar-thumb-slate-700 scrollbar-track-slate-800/50' 
      : 'scrollbar-thumb-slate-300 scrollbar-track-slate-100'}
  `;

  const handleEditorView = (view) => {
    editorRef.current = view;
    setEditorView(view);
  };

  const handleExecuteQuery = () => {
    if (editorRef.current) {
      const query = editorRef.current.state.doc.toString();
      if (query.trim()) {
        setQueryValue(query);
        executeQuery(query);
      }
    }
  };
  
  const editorContainer = useEditor(
    initialValue,
    isDarkMode,
    (view) => {
      editorRef.current = view;
      setEditorView(view);
    },
    isMobile
  );

  const handleResetDatabase = async () => {
    try {
      if (editorRef.current) {
        editorRef.current.dispatch({
          changes: { from: 0, to: editorRef.current.state.doc.length, insert: '' }
        });
      }
      setQueryValue('');
      await resetDatabase();
    } catch (error) {
      console.error('Reset failed:', error);
    }
  };

  return (
    <section
      className={`${queryWrap} transition-[height] duration-300 ease-in-out`}
      style={{
        minHeight: `${minHeight}px`,
        height: `${calculatedHeight}px`,
      }}
    >
      <div className={sectionHead}>
        <div className={dbSelectWrapper}>
          <span className="text-sm font-bold">SQL 코드 작성</span>
          <select 
            className={dbSelect}
            value={selectedDB}
            onChange={(e) => handleDBChange(e.target.value)}
          >
            {Object.entries(DB_CONFIGS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div className={buttonGroup}>
          {isEditorPage && !isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={editorBtn}
              aria-label={isExpanded ? "에디터 축소" : "에디터 확장"}
            >
              <ChevronIcon expanded={isExpanded} />
              <span className="sr-only">{isExpanded ? "축소" : "확장"}</span>
            </button>
          )}
          <button
            className={editorBtn}
            onClick={handleCopyCode}
            aria-label="코드 복사"
          >
            <CodeCopy className={editorIcon} />
            <span className="whitespace-nowrap text-sm font-bold">코드 복사</span>
          </button>
          <button
            className={editorBtn}
            onClick={handleResetDatabase}
            aria-label="데이터베이스 초기화"
          >
            <DBReset className={editorIcon} />
            <span className="whitespace-nowrap text-sm font-bold">DB 초기화</span>
          </button>
        </div>
      </div>
      <div ref={editorContainer} className={resultContent} />
      <button onClick={handleExecuteQuery} className={queryBtn}>
        <span>코드 실행</span>
      </button>
    </section>
  );
};

export default QuerySection;
