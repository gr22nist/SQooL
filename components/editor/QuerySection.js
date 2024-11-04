// components/editor/QuerySection.js
import React, { useState, useEffect, useMemo, useRef } from "react";
import useStore from "../../store/useStore";
import useEditor from "@/hooks/useEditor";
import { CodeCopy, DBReset, ChevronDown, ChevronUp } from "../icons/IconSet";

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
  const isDarkMode = useStore((state) => state.isDarkMode);
  const { showToast } = useStore();
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
    w-full 
    flex flex-col sm:flex-row 
    justify-between 
    items-center sm:items-center 
    gap-4 sm:gap-0 
    p-4 
    text-sm font-bold 
    border-b rounded-t-xl
    transition-colors duration-300
    ${
      isDarkMode
        ? "border-slate-800 bg-slate-900/80 text-slate-200"
        : "border-slate-100 bg-slate-50 text-slate-700"
    }
  `;

  const buttonGroup = `
    flex flex-row 
    items-stretch sm:items-center 
    gap-2
    mt-2 sm:mt-0 
  `;

  const editorBtn = `
    flex items-center justify-center
    gap-2
    px-4 py-2.5
    rounded-lg
    text-sm font-bold
    transition-all duration-300
    w-full sm:w-auto
    ${
      isDarkMode
        ? "bg-slate-800/80 text-slate-200 hover:bg-slate-700"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }
    hover:shadow-sm
    active:scale-95
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

  const handleCopyCode = async () => {
    const code = useEditor.current.state.doc.toString();
    try {
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

  return (
    <section
      className={`${queryWrap} transition-[height] duration-300 ease-in-out`}
      style={{
        minHeight: `${minHeight}px`,
        height: `${calculatedHeight}px`,
      }}
    >
      <div className={sectionHead}>
        <span>SQL 코드 작성</span>
        <div className={buttonGroup}>
          {!isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${editorBtn} ml-auto`}
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
            <span className="whitespace-nowrap">코드 복사</span>
          </button>
          <button
            className={editorBtn}
            onClick={resetDatabase}
            aria-label="데이터베이스 초기화"
          >
            <DBReset className={editorIcon} />
            <span className="whitespace-nowrap">DB 초기화</span>
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
