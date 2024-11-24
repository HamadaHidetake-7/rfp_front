import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function QuestionPage() {
    const router = useRouter();
    const { id, category } = router.query; // URLパラメータからテストIDとカテゴリを取得

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    // 質問データをバックエンドから取得
    useEffect(() => {
        if (category) {
            fetch(`http://127.0.0.1:8000/get_questions/${category}`)
                .then((res) => res.json())
                .then((data) => setQuestions(data))
                .catch((err) => console.error(err));
        }
    }, [category]);

    // 回答送信
    const handleSubmit = () => {
        if (selectedOption === null) {
            alert("選択肢を選んでください！");
            return;
        }

        // 次の質問、または結果ページへ移動
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null); // 選択状態をリセット
        } else {
            router.push({
                pathname: "/answerResult",
                query: { id, category, correctAnswers: 3, totalQuestions: questions.length },
            });
        }
    };

    if (!questions.length) {
        return <div>読み込み中...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-xl font-bold mb-4">{currentQuestion.question_text}</h1>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`w-full py-2 px-4 border rounded ${
                                selectedOption === index ? "bg-blue-500 text-white" : "bg-gray-100"
                            }`}
                            onClick={() => setSelectedOption(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded w-full hover:bg-yellow-600"
                >
                    次へ
                </button>
            </div>
        </div>
    );
}
