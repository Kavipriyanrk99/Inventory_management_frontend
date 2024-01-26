import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faIndianRupeeSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { DotLoaderAnimation } from "./IsLoadingAnimation";
import ProductAvatar from "./ProductAvatar";
import { getMonthName, getRegularTime } from "../utils/date";

export const UnitsMetricsCard = ({ isProductLoading, productFetchError, stockUnits }) => {
    return(
        <article className="min-w-56 min-h-36 my-2 p-4 bg-raisinblack rounded-xl relative">
            <FontAwesomeIcon 
                icon={faBoxOpen} 
                className="text-3xl px-2 py-2.5 rounded-lg bg-gradient-to-b from-orange-400 to-orange-500 backdrop-blur-lg" 
            />
            {isProductLoading && <DotLoaderAnimation />}
            {   
                productFetchError &&
                <h3 className="text-2xl font-bold pt-1">
                    {'...'}
                </h3>
            }
            {   
                !isProductLoading &&
                !productFetchError &&
                <h3 className="text-2xl font-bold pt-1">
                    {stockUnits}
                </h3>
            }
            <p className="text-slate-400">
                Stock Units
            </p>
            <div className="absolute top-0 right-0 h-36 w-2 bg-gradient-to-b from-orange-400 to-orange-500 backdrop-blur-lg border-e-1 rounded-e-md"></div>
        </article>
    );
}

export const PriceMetricsCard = ({ isProductLoading, productFetchError, stockWorth }) => {
    return(
        <article className="min-w-56 min-h-36 my-2 p-4 bg-raisinblack rounded-xl relative">
            <FontAwesomeIcon 
                icon={faIndianRupeeSign} 
                className='text-3xl px-4 py-2.5 rounded-lg bg-gradient-to-b from-green-400 to-green-500 backdrop-blur-lg' 
            />
            {isProductLoading && <DotLoaderAnimation />}
            {   
                productFetchError &&
                <h3 className="text-2xl font-bold pt-1">
                    {'...'}
                </h3>
            }
            {   
                !isProductLoading &&
                !productFetchError &&
                <h3 className="text-2xl font-bold pt-1">
                    {stockWorth}
                </h3>
            }
            <p className="text-slate-400">
                Stock Worth
            </p>
            <div className="absolute top-0 right-0 h-36 w-2 bg-gradient-to-b from-green-400 to-green-500 backdrop-blur-lg border-e-1 rounded-e-md"></div>
        </article>
    );
}

export const TransactionMetricsCard = ({ transaction, setPointerPosID }) => {

    return(
        <article className="w-8/12 py-2">
            <div className="w-full">
                {
                    transaction.transactionType === "CREATED" &&
                        <div className="w-full shadow-xl rounded-lg overflow-hidden">
                            <header  className="text-white text-left leading-tight pt-10 pb-6 px-6 flex justify-between bg-gradient-to-b from-blue-500 to-blue-600 backdrop-blur-lg">
                                <FontAwesomeIcon icon={faXmark} onClick={() => setPointerPosID('')} className="absolute top-0 right-0 p-3 text-xl hover:cursor-pointer"/>
                                <div>
                                    <div className="text-5xl font-bold tracking-tight">
                                        <span>{transaction.quantity + " "}</span>
                                        <span className="inline-block align-bottom pt-2 text-lg">nos.</span>
                                    </div>
                                    <p className="uppercase tracking-wide text-sm font-bold pt-2">{`ID: ${transaction.transactionID}`}</p>
                                </div>
                            </header>
                            <div className="flex flex-col p-6 border-t bg-raisinblack">
                                <div className="flex gap-4 items-center">
                                    <ProductAvatar
                                        productName={transaction.productName}
                                        transaction={transaction}
                                    />
                                    <div className="mr-3 p-1">
                                        <p className="text-blue-500 text-xs">{transaction.productID}</p>
                                        <p className="uppercase font-semibold">{transaction.productName}</p>
                                        <p className="text-sm text-slate-400">Product created in inventory</p>
                                        <p className="text-sm text-slate-400">{`On: ${getMonthName(transaction.transactionDate)} ${transaction.transactionDate.split('T')[0].split('-')[2]} at ${getRegularTime(transaction.transactionDate)} `}</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p className="py-2">
                                        <span className="text-slate-400">Unit Price: </span>
                                        <span className="font-semibold pl-2">{`₹ ${transaction.unitPrice}`}</span>
                                    </p>
                                    <div className="pb-2 flex">
                                        <span className="text-slate-400">Stock Worth: </span>
                                        <p className="font-semibold pl-2 flex flex-col">
                                            <span>{`${transaction.quantity} ✕ ${transaction.unitPrice}`}</span>
                                            <span>{`₹ ${parseInt(transaction.quantity) * parseFloat(transaction.unitPrice)}`}</span>
                                        </p>
                                    </div>
                                    <p className="py-2 flex">
                                        <span className="text-slate-400">Remarks: </span>
                                        <span className="font-semibold pl-2">{transaction.description}</span>
                                    </p>
                                </div>
                            </div>
                        </div>  
                }
                {
                    transaction.transactionType === "UPDATED" &&
                        <div className="w-full shadow-xl rounded-lg overflow-hidden">
                            <header  className="text-white text-left leading-tight pt-10 pb-6 px-6 flex justify-between bg-gradient-to-b from-orange-500 to-orange-600 backdrop-blur-lg">
                                <FontAwesomeIcon icon={faXmark} onClick={() => setPointerPosID('')} className="absolute top-0 right-0 p-3 text-xl hover:cursor-pointer"/>
                                <div>
                                    <div className="text-5xl font-bold tracking-tight">
                                        <span>{transaction.quantity + " "}</span>
                                        <span className="inline-block align-bottom pt-2 text-lg">nos.</span>
                                    </div>
                                    <p className="uppercase tracking-wide text-sm font-bold pt-2">{`ID: ${transaction.transactionID}`}</p>
                                </div>
                            </header>
                            <div className="flex flex-col p-6 border-t bg-raisinblack">
                                <div className="flex gap-4 items-center">
                                    <ProductAvatar
                                        productName={transaction.productName}
                                        transaction={transaction}
                                    />
                                    <div className="mr-3 p-1">
                                        <p className="text-orange-500 text-xs">{transaction.productID}</p>
                                        <p className="uppercase font-semibold">{transaction.productName}</p>
                                        <p className="text-sm text-slate-400">Product details updated in inventory</p>
                                        <p className="text-sm text-slate-400">{`On: ${getMonthName(transaction.transactionDate)} ${transaction.transactionDate.split('T')[0].split('-')[2]} at ${getRegularTime(transaction.transactionDate)} `}</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p className="py-2">
                                        <span className="text-slate-400">Unit Price: </span>
                                        <span className="font-semibold pl-2">{`₹ ${transaction.unitPrice}`}</span>
                                    </p>
                                    <div className="pb-2 flex">
                                        <span className="text-slate-400">Stock Worth: </span>
                                        <p className="font-semibold pl-2 flex flex-col">
                                            <span>{`${transaction.quantity} ✕ ${transaction.unitPrice}`}</span>
                                            <span>{`₹ ${parseInt(transaction.quantity) * parseFloat(transaction.unitPrice)}`}</span>
                                        </p>
                                    </div>
                                    <p className="py-2 flex">
                                        <span className="text-slate-400">Remarks: </span>
                                        <span className="font-semibold pl-2">{transaction.description}</span>
                                    </p>
                                </div>
                            </div>
                        </div>  
                }
                {
                    transaction.transactionType === "IN" &&
                        <div className="w-full shadow-xl rounded-lg overflow-hidden">
                            <header  className="text-white text-left leading-tight pt-10 pb-6 px-6 flex justify-between bg-gradient-to-b from-green-500 to-green-600 backdrop-blur-lg">
                                <FontAwesomeIcon icon={faXmark} onClick={() => setPointerPosID('')} className="absolute top-0 right-0 p-3 text-xl hover:cursor-pointer"/>
                                <div>
                                    <div className="text-5xl font-bold tracking-tight">
                                        <span>{transaction.quantity + " "}</span>
                                        <span className="inline-block align-bottom pt-2 text-lg">nos.</span>
                                    </div>
                                    <p className="uppercase tracking-wide text-sm font-bold pt-2">{`ID: ${transaction.transactionID}`}</p>
                                </div>
                            </header>
                            <div className="flex flex-col p-6 border-t bg-raisinblack">
                                <div className="flex gap-4 items-center">
                                    <ProductAvatar
                                        productName={transaction.productName}
                                        transaction={transaction}
                                    />
                                    <div className="mr-3 p-1">
                                        <p className="text-green-500 text-xs">{transaction.productID}</p>
                                        <p className="uppercase font-semibold">{transaction.productName}</p>
                                        <p className="text-sm text-slate-400">Product added into inventory</p>
                                        <p className="text-sm text-slate-400">{`On: ${getMonthName(transaction.transactionDate)} ${transaction.transactionDate.split('T')[0].split('-')[2]} at ${getRegularTime(transaction.transactionDate)} `}</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p className="py-2">
                                        <span className="text-slate-400">Unit Price: </span>
                                        <span className="font-semibold pl-2">{`₹ ${transaction.unitPrice}`}</span>
                                    </p>
                                    <div className="pb-2 flex">
                                        <span className="text-slate-400">Stock Worth: </span>
                                        <p className="font-semibold pl-2 flex flex-col">
                                            <span>{`${transaction.quantity} ✕ ${transaction.unitPrice}`}</span>
                                            <span>{`₹ ${parseInt(transaction.quantity) * parseFloat(transaction.unitPrice)}`}</span>
                                        </p>
                                    </div>
                                    <p className="py-2 flex">
                                        <span className="text-slate-400">Remarks: </span>
                                        <span className="font-semibold pl-2">{transaction.description}</span>
                                    </p>
                                </div>
                            </div>
                        </div>  
                }
                {
                    transaction.transactionType === "OUT" &&
                        <div className="w-full shadow-xl rounded-lg overflow-hidden">
                            <header  className="text-white text-left leading-tight pt-10 pb-6 px-6 flex justify-between bg-gradient-to-b from-red-500 to-red-600 backdrop-blur-lg">
                                <FontAwesomeIcon icon={faXmark} onClick={() => setPointerPosID('')} className="absolute top-0 right-0 p-3 text-xl hover:cursor-pointer"/>
                                <div>
                                    <div className="text-5xl font-bold tracking-tight">
                                        <span>{transaction.quantity + " "}</span>
                                        <span className="inline-block align-bottom pt-2 text-lg">nos.</span>
                                    </div>
                                    <p className="uppercase tracking-wide text-sm font-bold pt-2">{`ID: ${transaction.transactionID}`}</p>
                                </div>
                            </header>
                            <div className="flex flex-col p-6 border-t bg-raisinblack">
                                <div className="flex gap-4 items-center">
                                    <ProductAvatar
                                        productName={transaction.productName}
                                        transaction={transaction}
                                    />
                                    <div className="mr-3 p-1">
                                        <p className="text-red-500 text-xs">{transaction.productID}</p>
                                        <p className="uppercase font-semibold">{transaction.productName}</p>
                                        <p className="text-sm text-slate-400">Product removed from inventory</p>
                                        <p className="text-sm text-slate-400">{`On: ${getMonthName(transaction.transactionDate)} ${transaction.transactionDate.split('T')[0].split('-')[2]} at ${getRegularTime(transaction.transactionDate)} `}</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p className="py-2">
                                        <span className="text-slate-400">Unit Price: </span>
                                        <span className="font-semibold pl-2">{`₹ ${transaction.unitPrice}`}</span>
                                    </p>
                                    <div className="pb-2 flex">
                                        <span className="text-slate-400">Stock Worth: </span>
                                        <p className="font-semibold pl-2 flex flex-col">
                                            <span>{`${transaction.quantity} ✕ ${transaction.unitPrice}`}</span>
                                            <span>{`₹ ${parseInt(transaction.quantity) * parseFloat(transaction.unitPrice)}`}</span>
                                        </p>
                                    </div>
                                    <p className="py-2 flex">
                                        <span className="text-slate-400">Remarks: </span>
                                        <span className="font-semibold pl-2">{transaction.description}</span>
                                    </p>
                                </div>
                            </div>
                        </div>  
                } 
            </div>
        </article>
    );
}