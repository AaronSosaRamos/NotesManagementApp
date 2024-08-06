const CategoryListComponent = ({ categories, searchTerm, onEdit, onDelete }) => {
    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <ul className="space-y-4">
        {filteredCategories.map((category, index) => (
          <li key={index} className="p-4 border border-gray-300 rounded flex justify-between items-center">
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${category.color}`}>
              {category.name}
            </span>
            <div>
              <button
                onClick={() => onEdit(category)}
                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(category)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default CategoryListComponent;
  