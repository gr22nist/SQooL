import { useState } from 'react';
import { downloadDB } from '../common/DbDownApi';

export default function DownloadSection() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        const success = await downloadDB('Artist');
        if (!success) {
            alert('데이터베이스 다운로드에 실패했습니다.');
        }
        setIsLoading(false);
    };

    return (
        <div className="my-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">데이터베이스 다운로드</h3>
            <p className="mb-4">실습에 필요한 Artist 데이터베이스를 다운로드하세요.</p>
            <button 
                onClick={handleDownload}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isLoading ? '다운로드 중...' : 'Artist DB 다운로드'}
            </button>
        </div>
    );
}
