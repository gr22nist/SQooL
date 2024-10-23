const apiInitUrl = process.env.NEXT_PUBLIC_API_INIT_URL;
const apiQueryUrl = process.env.NEXT_PUBLIC_API_QUERY_URL;
const DB_NAME = 'Artist';

const handleResponse = async (response) => {
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || '요청 처리 중 오류가 발생했습니다.');
  }
  return result;
};

export const createDatabase = async () => {
  try {
    const result = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ dbname: DB_NAME }),
      credentials: 'include',
    }).then(handleResponse);

    return result;
  } catch (error) {

    throw error;
  }
};

export const resetDatabase = async () => {
  try {
    const result = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ dbname: DB_NAME, reset: true }),
      credentials: 'include',
    }).then(handleResponse);

    return result;
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
};

export const executeQuery = async (query, setQueryResult) => {

  try {
    const result = await fetch(apiQueryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ query, dbname: DB_NAME }),
      credentials: 'include',
    }).then(handleResponse);

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
