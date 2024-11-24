import { useRouter } from "next/router";

export default function CategorySelection() {
    const router = useRouter();

    const handleCategorySelect = (category) => {
        // 選択したカテゴリで questionPage に移動
        router.push({
            pathname: "/questionPage",
            query: { category: category },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center max-w-sm">
                <h1 className="text-xl font-bold mb-6">Select a Category</h1>
                <button
                    onClick={() => handleCategorySelect("Biz Basics")}
                    className="mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Biz
                </button>
                <button
                    onClick={() => handleCategorySelect("Design Thinking")}
                    className="mb-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Design
                </button>
                <button
                    onClick={() => handleCategorySelect("Tech Quiz")}
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                    Tech
                </button>
            </div>
        </div>
    );
}
