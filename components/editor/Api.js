// components/editor/Api.js
const categoryUrl = process.env.NEXT_PUBLIC_API_CATEGORY_URL;
const contentUrl = process.env.NEXT_PUBLIC_API_CONTENTS_URL;
const queryUrl = process.env.NEXT_PUBLIC_API_QUERY_URL;
const initUrl = process.env.NEXT_PUBLIC_API_INIT_URL;

export const getCategoryList = async () => {
    try {
        const response = await fetch(categoryUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching category list:', error);
        throw error;
    }
};

export const getContent = async (documentId) => {
    try {
        const response = await fetch(`${contentUrl}${documentId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
};

export const resetDatabase = async () => {
  try {
    const response = await fetch(apiInitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ dbname: 'Artist', reset: true }), // Assuming the API accepts a reset flag
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Database reset failed');
    }

    const data = await response.json();
    console.log('Database reset successfully', data);
  } catch (error) {
    console.error('Error resetting database:', error);
  }
};

export const executeQuery = async (query, setQueryResult) => {
  console.log('Executing query:', query);

  try {
    const response = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ query }),
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      console.log('Error response text:', result.message);
      setQueryResult({
        message: result.message,
        columns: [],
        rows: [],
        error: null //status 값이 화면에 뜨지 않도록 수정
      });
      return { success: false };
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
      message: error.message,
      columns: [],
      rows: [],
      error: error.message
    });
  }
};
