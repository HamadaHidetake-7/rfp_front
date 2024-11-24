import { useRouter } from "next/router";

export default function CategorySelection() {
    const router = useRouter();
    const { id } = router.query; // テストIDを取得

    const handleCategorySelect = (category) => {
        // 選択したカテゴリをパラメータとして問題解答画面に遷移
        router.push(`/questionPage?id=${id}&category=${category}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Select a Category
                </h1>
                <div className="space-y-4">
                    <button
                        onClick={() => handleCategorySelect("Biz")}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Biz
                    </button>
                    <button
                        onClick={() => handleCategorySelect("Design")}
                        className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600"
                    >
                        Design
                    </button>
                    <button
                        onClick={() => handleCategorySelect("Tech")}
                        className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600"
                    >
                        Tech
                    </button>
                </div>
            </div>
        </div>
    );
}
