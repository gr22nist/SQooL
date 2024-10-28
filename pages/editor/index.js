import React, { useEffect, useState } from 'react';
import SQLEditor from '@/components/editor/SqlEditor';
import useStore from '@/store/useStore';

/**
 * Editor 컴포넌트
 * - SQL 편집기 화면을 렌더링합니다.
 * - 초기 로딩 시, API를 통해 데이터베이스를 생성합니다.
 * - SQL 쿼리 결과를 보여주기 위해 상태를 관리합니다.
 *
 * @returns {JSX.Element} SQL 편집기 페이지를 렌더링하는 컴포넌트
 */
const Editor = () => {
  const totalOffset = useStore((state) => state.totalOffset); 
  const [queryResult, setQueryResult] = useState({ columns: [], rows: [] });
  
  const container = `max-w-content-full mx-auto h-full min-h-[calc(100vh-${totalOffset}px)]`;

  return (
    <section className={container}>
      <SQLEditor
        placeholder="쿼리문을 입력해주세요. 예시) SELECT * FROM Artist;"
        queryResult={queryResult}
        setQueryResult={setQueryResult}
      />
    </section>
  );
}

export default Editor;
