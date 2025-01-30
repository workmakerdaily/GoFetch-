interface Props {
    categories: { name: string; code: string }[];
    onSelectCategory: (code: string) => void;
    selectedCategory: string | null;
}

const TouristCategory = ({ categories, onSelectCategory, selectedCategory }: Props) => {
    
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
                <div
                    key={category.code}
                    onClick={() => onSelectCategory(category.code)}
                    className={`bg-white border-1 rounded-full px-4 py-2 cursor-pointer hover:opacity-50 ${
                        selectedCategory === category.code ? "border-2 border-[#3949AB]" : ""
                    }`}
                >
                    <h2 className="text-l font-semibold text-gray-800">{category.name}</h2>
                </div>
            ))}
        </div>
    );
};

export default TouristCategory;