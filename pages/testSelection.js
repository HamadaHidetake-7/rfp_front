import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TestSelection() {
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/get_today_test");
                if (!response.ok) {
                    throw new Error("Failed to fetch test data");
                }
                const data = await response.json();
                setTest(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTest();
    }, []);

    const handleStartTest = () => {
        if (test) {
            // カテゴリ選択画面に遷移
            router.push(`/categorySelection?id=${test.id}`);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
    }

    if (!test) {
        return (
            <div className="text-center text-gray-700 mt-10">
                No test is scheduled for today.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {test.title}
                </h1>
                <p className="text-gray-600 text-center mb-6">{test.date}</p>
                <button
                    onClick={handleStartTest}
                    className="bg-yellow-500 text-white py-3 px-6 rounded-lg w-full hover:bg-yellow-600"
                >
                    スタート
                </button>
            </div>
        </div>
    );
}
