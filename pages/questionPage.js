import { useRouter } from "next/router";

export default function QuestionPage() {
    const router = useRouter();
    const { id } = router.query; // URL パラメータからテストIDを取得

    const question = {
        question_text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
    };

    const handleAnswer = (option) => {
        // 結果表示画面へ遷移（テストIDと選択した回答を渡す）
        router.push(`/resultPage?id=${id}&answer=${option}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
                Test ID: {id} - Question 1
            </h1>
            <p className="text-lg text-gray-700 mb-6">{question.question_text}</p>
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
