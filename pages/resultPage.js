import { useRouter } from "next/router";

export default function ResultPage() {
    const router = useRouter();
    const { id, answer } = router.query;

    const result = {
        correct: 3,
        total: 5,
        message: "Good Job! Keep practicing to improve further.",
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Results</h1>
            <p className="text-lg text-gray-700">
                Test ID: {id}
            </p>
            <p className="text-lg text-gray-700">
                Your Answer: {answer}
            </p>
            <p className="text-lg text-gray-700">
                You answered {result.correct} out of {result.total} correctly.
            </p>
            <p className="mt-4 text-gray-600">{result.message}</p>
            <button
                onClick={() => router.push("/testSelection")}
                className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
            >
                Back to Test Selection
            </button>
        </div>
    );
}
