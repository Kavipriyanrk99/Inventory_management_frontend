import { useState } from "react";

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

export const ProductFilter = ({ productFilterList, filterProductBy, setFilterProductBy }) => {

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
            <label htmlFor="productFilterBy">Product:</label>
            <select id="productFilterBy"  value={filterProductBy} onChange={(e) => setFilterProductBy(e.target.value)}  className="w-full mx-2 px-3 py-2 text-sm text-slate-400 bg-raisinblack rounded-lg shadow-sm border-none outline-none appearance-none">
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