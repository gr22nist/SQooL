import { useCallback } from 'react';

export const useClipboard = (showToast) => {
  return useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('코드가 복사되었습니다.', 'success');
    } catch (err) {
      console.error('복사 실패:', err);
      showToast('코드 복사에 실패했습니다.', 'error');
    }
  }, [showToast]);
}; 