import { useRouter } from "next/router";

export default function AnswerResult() {
    const router = useRouter();
    const { correctAnswers, totalQuestions, category } = router.query;

    const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">
                    {correctAnswers === totalQuestions ? "正解！" : "もう少し！"}
                </h1>
                <p className="mb-4">正解率: {accuracy}%</p>
                <button
                    onClick={() => router.push("/categorySelection")}
                    className="bg-yellow-500 text-white py-2 px-4 rounded w-full hover:bg-yellow-600"
                >
                    カテゴリー選択に戻る
                </button>
            </div>
        </div>
    );
}
