const apiInitUrl = process.env.NEXT_PUBLIC_API_INIT_URL;
const apiQueryUrl = process.env.NEXT_PUBLIC_API_QUERY_URL;

let currentDB = 'K-idol';
let isInitializing = false;
let isInitialized = false;

export const setCurrentDB = (dbName) => {
  currentDB = dbName;
  isInitialized = false;
};

export const createDatabase = async () => {
  if (isInitialized) {
    console.log('Database already initialized');
    return;
  }

  if (isInitializing) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return createDatabase();
  }

  try {
    isInitializing = true;
    const response = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ dbname: currentDB }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Database creation failed with status: ${response.status}`);
    }

    const data = await response.json();
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
    const response = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ dbname: currentDB, reset: true }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Database reset failed');
    }

    const data = await response.json();
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
};

export const executeQuery = async (query, setQueryResult) => {
  console.log('Executing query:', query);

  try {
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
        dbname: currentDB
      }),
      credentials: 'include',
    });

    if (!response.ok) {

      if (response.status === 412) {
        isInitialized = false;
        return executeQuery(query, setQueryResult);
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

export const downloadDB = async (dbName) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sqool/download/${dbName}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dbName}_DB.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  } catch (error) {
    console.error('Error downloading database:', error);
    throw error;
  }
};