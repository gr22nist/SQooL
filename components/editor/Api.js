const apiInitUrl = process.env.NEXT_PUBLIC_API_INIT_URL;
const apiQueryUrl = process.env.NEXT_PUBLIC_API_QUERY_URL;
const DB_NAME = 'Artist';

let isInitializing = false;
let isInitialized = false;

export const createDatabase = async () => {
  if (isInitialized) {
    console.log('Database already initialized');
    return;
  }

  if (isInitializing) {
    console.log('Database initialization already in progress');
    await new Promise(resolve => setTimeout(resolve, 1000));  // 잠시 대기
    return createDatabase();  // 재시도
  }

  try {
    isInitializing = true;
    console.log('Creating database...');
    const response = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ dbname: DB_NAME }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Database creation failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Database created successfully', data);
    isInitialized = true;
  } catch (error) {
    console.error('Error creating database:', error);
    isInitialized = false;
    throw error;
  } finally {
    isInitializing = false;
  }
};

export const resetDatabase = async () => {
  try {
    console.log('Resetting database...');
    const response = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ dbname: DB_NAME, reset: true }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Database reset failed');
    }

    const data = await response.json();
    console.log('Database reset successfully', data);
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
};

export const executeQuery = async (query, setQueryResult) => {
  console.log('Executing query:', query);

  try {
    // DB가 초기화되지 않았다면 먼저 초기화
    if (!isInitialized) {
      try {
        await createDatabase();
      } catch (error) {
        console.error('Database initialization failed:', error);
        setQueryResult({
          message: '데이터베이스 초기화에 실패했습니다.',
          columns: [],
          rows: [],
          error: null
        });
        return;
      }
    }

    const response = await fetch(apiQueryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ 
        query,
        dbname: DB_NAME  // dbname 추가
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      // 412 에러가 발생하면 DB를 다시 초기화
      if (response.status === 412) {
        isInitialized = false;  // 초기화 상태 리셋
        return executeQuery(query, setQueryResult);  // 재귀적으로 다시 시도
      }
      throw new Error(`Query failed with status: ${response.status}`);
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
      message: error.message || '쿼리 실행 중 오류가 발생했습니다.',
      columns: [],
      rows: [],
      error: null
    });
  }
};
