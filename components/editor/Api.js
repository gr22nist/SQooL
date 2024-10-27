const apiInitUrl = process.env.NEXT_PUBLIC_API_INIT_URL;
const apiQueryUrl = process.env.NEXT_PUBLIC_API_QUERY_URL;
const DB_NAME = 'Artist'; 

export const createDatabase = async () => {
  try {
    console.log('Creating database...');
    const response = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ name: DB_NAME }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Database creation failed');
    }

    const data = await response.json();
    console.log('Database created successfully', data);
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
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
      body: JSON.stringify({ dbname: 'Artist', reset: true }),
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
    const response = await fetch(apiQueryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ query }),
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      console.log('Error response:', result);
      setQueryResult({
        message: result.message || '쿼리 실행 중 오류가 발생했습니다.',
        columns: [],
        rows: [],
        error: null
      });
      return;
    }

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