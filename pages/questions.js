import { useState, useEffect } from "react";

export default function Questions() {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // バックエンドからデータを取得
        fetch("http://127.0.0.1:8000/questions_db")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setQuestions(data))
            .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    }

    if (questions.length === 0) {
        return <div className="text-blue-500 text-center mt-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Questions List
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {questions.map((question) => (
                        <div
                            key={question.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                {question.question_text}
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                                {question.options.map((option, index) => (
                                    <li key={index} className="text-gray-700">
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-500">
                                    Category:
                                </span>{" "}
                                <span className="text-sm text-gray-800">
                                    {question.category}
                                </span>
                            </div>
                            <div className="mt-2 text-gray-600 text-sm">
                                <strong>Explanation:</strong> {question.explanation}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
