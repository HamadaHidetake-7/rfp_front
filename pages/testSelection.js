import { useRouter } from "next/router";

export default function TestSelection() {
    const router = useRouter();

    const tests = [
        { id: 1, title: "Tech Quiz", date: "2024-11-21" },
        { id: 2, title: "Biz Basics", date: "2024-11-22" },
        { id: 3, title: "Design Thinking", date: "2024-11-23" },
    ];

    const handleStartTest = (id) => {
        // 問題解答画面へ遷移
        router.push(`/questionPage?id=${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Select a Test
            </h1>
            <div className="space-y-4">
                {tests.map((test) => (
                    <button
                        key={test.id}
                        onClick={() => handleStartTest(test.id)}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600"
                    >
                        {test.title} <span className="text-sm">({test.date})</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
