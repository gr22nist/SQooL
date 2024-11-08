import { useState, useEffect } from 'react';
import { getContent } from '@/components/start/Api';

export const useContent = (documentId) => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (!documentId) return;
      
      try {
        setIsLoading(true);
        const response = await getContent(documentId);
        if (response.status === "게시글 상세 내용 불러오기 성공") {
          setContent(response.document);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [documentId]);

  return { content, isLoading };
};
