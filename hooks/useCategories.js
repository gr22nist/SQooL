import { useState, useEffect } from 'react';
import { getCategoryList } from '@/components/start/Api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryList();
        if (data?.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error in useCategories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading };
}; 