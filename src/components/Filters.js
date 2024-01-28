export const DateFilter = ({ fromDate, setFromDate, toDate, setToDate}) => {
    return(
        <div className="flex items-center">
            <label htmlFor="fromDate">Date:</label>
            <div className="flex items-center px-2">
                <input 
                    id="fromDate" 
                    className="w-32 px-2 py-1 text-slate-400 outline-none bg-raisinblack rounded-lg" 
                    type="date" 
                    name="toDate" 
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                ></input>
                <span className="px-1 text-slate-400">to</span>
                <input 
                    id="toDate" 
                    className="w-32 px-2 py-1 text-slate-400 outline-none bg-raisinblack rounded-lg" 
                    type="date" 
                    name="toDate"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    min={fromDate}
                    required
                ></input>
            </div>
        </div>
    );
}

export const ProductFilter = ({ productFilterList, filterByProduct, setFilterByProduct }) => {

    return(
        <div className="relative w-fit max-w-full flex items-center">
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
            <label htmlFor="filterByProduct">Product:</label>
            <select id="filterByProduct"  value={filterByProduct} onChange={(e) => setFilterByProduct(e.target.value)}  className="w-full mx-2 px-3 py-2 text-sm text-slate-400 bg-raisinblack rounded-lg shadow-sm border-none outline-none appearance-none">
                <option value="none">None</option>
                {
                    productFilterList.length > 0 && 
                        productFilterList.map((product) => (
                            <option key={product.productID} value={product.productID}>{product.productName}</option>
                        ))
                }
            </select>
        </div>
    );
}

export const TypeFilter = ({ filterByType, setFilterByType }) => {
    return(
        <div className="relative w-fit max-w-full flex items-center">
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
            <label htmlFor="filterByType">Type:</label>
            <select id="filterByType" value={filterByType} onChange={(e) => setFilterByType(e.target.value)}  className="w-full mx-2 px-3 py-2 text-sm text-slate-400 bg-raisinblack rounded-lg shadow-sm border-none outline-none appearance-none">
                <option value="none">None</option>
                <option value="CREATED">CREATED</option>
                <option value="UPDATED">UPDATED</option>
                <option value="IN">IN</option>
                <option value="OUT">OUT</option>
            </select>
        </div>
    );
}

export const PriceFilter = ({ filterByPriceFrom, setFilterByPriceFrom, filterByPriceTo, setFilterByPriceTo}) => {
    return(
        <div className="flex items-center">
            <label htmlFor="priceFrom">Price:</label>
            <div className="flex items-center px-2">
                <input 
                    id="priceFrom"
                    type="number"
                    placeholder="min"
                    min={0}
                    value={filterByPriceFrom}
                    onChange={(e) => setFilterByPriceFrom(e.target.value)}
                    className="w-16 px-2 py-1 text-slate-400 outline-none bg-raisinblack rounded-lg"
                ></input> 
                <span className="px-1 text-slate-400">to</span>
                <input 
                    id="priceTo"
                    type="number"
                    placeholder="max"
                    min={0}
                    value={filterByPriceTo}
                    onChange={(e) => setFilterByPriceTo(e.target.value)}
                    className="w-16 px-2 py-1 text-slate-400 outline-none bg-raisinblack rounded-lg"
                ></input>
            </div>            
        </div>
    );
}

export const QuantityFilter = ({ filterByQuantityFrom, setFilterByQuantityFrom, filterByQuantityTo, setFilterByQuantityTo}) => {
    return(
        <div className="flex items-center">
            <label htmlFor="quantityFrom">Quantity:</label>
            <div className="flex items-center px-2">
                <input 
                    id="quantityFrom"
                    type="number"
                    placeholder="min"
                    min={0}
                    value={filterByQuantityFrom}
                    onChange={(e) => setFilterByQuantityFrom(e.target.value)}
                    className="w-16 px-2 py-1 text-slate-400 outline-none bg-raisinblack rounded-lg appearance-none"
                ></input> 
                <span className="px-1 text-slate-400">to</span>
                <input 
                    id="quantityTo"
                    type="number"
                    placeholder="max"
                    min={0}
                    value={filterByQuantityTo}
                    onChange={(e) => setFilterByQuantityTo(e.target.value)}
                    className="w-16 px-2 py-1 text-slate-400 outline-none bg-raisinblack rounded-lg"
                ></input>
            </div>            
        </div>
    );
}