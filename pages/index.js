import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
    const [testTitle, setTestTitle] = useState('');

    // ダミーデータの取得（実際にはバックエンドと接続します）
    useEffect(() => {
        fetch('http://127.0.0.1:8000/get_today_test')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.title) {
                    setTestTitle(data.title);
                } else {
                    setTestTitle('No Test Available');
                }
            })
            .catch(() => {
                setTestTitle('Error fetching test');
            });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
            <div className="bg-white p-8 rounded shadow-md text-center max-w-sm">
                <h1 className="text-xl font-bold mb-4">
                    {new Date().toLocaleDateString()} - {testTitle}
                </h1>
                <Link href="/categorySelection">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                        スタート
                    </button>
                </Link>
            </div>
        </div>
    );
}
