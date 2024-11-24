import { useRouter } from "next/router";

export default function ResultPage() {
    const router = useRouter();
    const { id, category, correctCount, totalQuestions } = router.query;

    const handleReturnHome = () => {
        router.push("/testSelection");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">テスト完了！🎉</h1>
                <p className="text-lg text-gray-700 mb-4">
                    テストID: {id} - カテゴリ: {category}
                </p>
                <p className="text-xl font-bold text-green-600 mb-4">
                    正解数: {correctCount} / {totalQuestions}
                </p>
                <p className="text-gray-700 mb-6">
                    お疲れさまでした！このテストで学びを深められたことを願っています。
                </p>
                <button
                    onClick={handleReturnHome}
                    className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
                >
                    ホームに戻る
                </button>
            </div>
        </div>
    );
}
