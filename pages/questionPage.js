import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function QuestionPage() {
    const router = useRouter();
    const { id, category } = router.query; // テストIDとカテゴリを取得
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の質問番号

    // カテゴリ名をバックエンドに合わせる
    const adjustedCategory = category === "Tech" ? "Tech Quiz" :
                             category === "Biz" ? "Biz Basics" :
                             category === "Design" ? "Design Thinking" : category;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/get_questions/${adjustedCategory}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch questions");
                }
                const data = await response.json();
                setQuestions(data); // ランダムな3問が返ってくる
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (adjustedCategory) {
            fetchQuestions();
        }
    }, [adjustedCategory]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // 次の質問へ進む
        } else {
            alert("This is the last question!");
            router.push(`/resultPage?id=${id}&category=${category}`); // 結果表示ページに遷移
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        return <div className="text-center text-red-500 mt-10">No questions available</div>;
    }

    const currentQuestion = questions[currentQuestionIndex]; // 現在の質問を取得

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-xl font-bold text-gray-800 mb-4">
                    {category} - Question {currentQuestionIndex + 1} / {questions.length}
                </h1>
                <p className="text-lg text-gray-700 mb-6">{currentQuestion.question_text}</p>
                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={handleNextQuestion}
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
