const apiInitUrl = process.env.NEXT_PUBLIC_API_INIT_URL;
const apiQueryUrl = process.env.NEXT_PUBLIC_API_QUERY_URL;
const DB_NAME = 'Artist';

let sessionId = null;

const handleResponse = async (response) => {
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || '요청 처리 중 오류가 발생했습니다.');
  }
  return result;
};

export const createDatabase = async () => {
  const response = await fetch(apiInitUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ dbname: DB_NAME }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Database creation failed');
  }

  const result = await response.json();
  return result.sqldb_id;
};

export const resetDatabase = async () => {
  sessionId = null;
  const response = await fetch(apiInitUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ dbname: DB_NAME, reset: true }),
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Database reset failed');
  }

  const result = await response.json();
  sessionId = result.sessionId;  // 새로운 세션 ID를 저장
  return result;
};

export const executeQuery = async (query, setQueryResult) => {
  try {
    const response = await fetch(apiQueryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ query, dbname: DB_NAME }),
      credentials: 'include',
    });

    if (response.status === 412) {
      // 세션이 만료되었거나 sqldb_id가 없는 경우
      await createDatabase();
      return executeQuery(query, setQueryResult);  // 재귀적으로 다시 시도
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setQueryResult({
      message: result.message,
      columns: result.columns || [],
      rows: result.result || [],
      error: null
    });
  } catch (error) {
    console.error('쿼리 실행 중 오류:', error);
    setQueryResult({
      message: error.message,
      columns: [],
      rows: [],
      error: error.message
    });
  }
};
