function FilterButtons({ activeFilter, onFilterChange }) {
  const filters = ["all", "completed", "active"];
  const filterNames = { all: "All", completed: "Done", active: "To do" };
  const filterColors = {
    all: "bg-blue-500",
    completed: "bg-green-500",
    active: "bg-yellow-500",
  };

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
      {filters.map((filter) => (
        <button
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
            activeFilter === filter
              ? `${filterColors[filter]} text-white shadow-md`
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {filterNames[filter]}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
