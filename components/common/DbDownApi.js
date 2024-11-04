export async function downloadDB(dbname) {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_DBFILE_URL;
        const response = await fetch(`${API_URL}/${dbname}`, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${dbname}.db`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        
        return true; // 성공 시 true 반환
    } catch (error) {
        console.error('다운로드 실패:', error);
        return false; // 실패 시 false 반환
    }
}