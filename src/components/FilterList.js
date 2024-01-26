const FilterList = ({ sortOrder, setSortOrder }) => {
    return (
        <div className="relative w-48 max-w-full">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
            viewBox="0 0 20 20"
            fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
            <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full px-3 py-2 text-sm text-white bg-raisinblack rounded-lg shadow-sm border-none outline-none appearance-none">
                <option value="" disabled>Sort by:</option>
                <option value="none">None</option>
                <option value="dateNewToOld">Date: New to Old</option>
                <option value="dateOldToNew">Date: Old to New</option>
                <option value="quantityHighToLow">Quantity: High to Low</option>
                <option value="quantityLowToHigh">Quantity: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="priceLowToHigh">Price: Low to High</option>
            </select>
        </div>
    );
  };

  export default FilterList;