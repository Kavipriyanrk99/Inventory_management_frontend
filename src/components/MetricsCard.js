import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faBoxOpen, faIndianRupeeSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { DotLoaderAnimation } from "./IsLoadingAnimation";
import ProductAvatar from "./ProductAvatar";
import { getMonthName, getRegularTime } from "../utils/date";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

export const MetricsCard = ({ isProductLoading, productFetchError, type, data }) => {
    const color = (type === "products" ? "orange" : type === "stockUnits" ? "yellow" : "green");
    const paddingX = (type === "products" ? "2.5" : type === "stockUnits" ? "2" : "4");
    const caption = (type === "products" ? "Products" : type === "stockUnits" ? "Stock Units" : "Stock Worth");

    return(
        <article className="min-w-56 min-h-36 my-2 p-4 bg-raisinblack rounded-xl relative">
            <FontAwesomeIcon 
                icon={type === "products" ? faProductHunt : type === "stockUnits" ? faBoxOpen : faIndianRupeeSign} 
                className={`text-2xl px-${paddingX} py-2.5 rounded-lg bg-gradient-to-b from-${color}-400 to-${color}-500 backdrop-blur-lg`}
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
                    {data}
                </h3>
            }
            <p className="text-slate-400">
                {caption}
            </p>
            <div className={`absolute top-0 right-0 h-36 w-2 bg-gradient-to-b  backdrop-blur-lg border-e-1 rounded-e-md from-${color}-400 to-${color}-500`}></div>
        </article>
    );
}

export const MovementsMetricsCard = ({ isProductLoading, productFetchError, inPercentage, outPercentage }) => {
    return(
        <article className="min-w-56 min-h-36 my-2 p-4 bg-raisinblack rounded-xl relative">
            <FontAwesomeIcon 
                icon={faArrowRightArrowLeft} 
                className="text-2xl px-3 py-2.5 rounded-lg bg-gradient-to-b from-blue-400 to-blue-500 backdrop-blur-lg" 
            />
            <div className="flex justify-start">
                <div className="w-1/2">
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
                            {inPercentage}
                            <span className="text-sm text-slate-400">%</span>
                        </h3>
                    }
                    <p className="text-slate-400">
                        Inbound
                    </p>
                </div>
                <div className="w-1/2">
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
                            {outPercentage}
                            <span className="text-sm text-slate-400">%</span>
                        </h3>
                    }
                    <p className="text-slate-400">
                        Outbound
                    </p>
                </div>
            </div>
            <div className={`absolute top-0 right-0 h-36 w-2 bg-gradient-to-b  backdrop-blur-lg border-e-1 rounded-e-md from-blue-400 to-blue-500`}></div>
        </article>
    );
}

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
            <div className="w-full pb-6">
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

export const EmptyTransactionCard = () => {
    return(
        <article className="w-8/12 h-full py-2">
            <div className="w-full h-full pb-6">
                <div className="w-full h-full flex flex-col justify-center items-center shadow-xl rounded-lg overflow-hidden border-2 border-dashed border-slate-500 text-slate-500">
                    <svg version="1.1" viewBox="0 0 5558.7 2169.3" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(-671.85 -2105.3)" fill="#64748b" fillRule="evenodd">
                            <path d="m3784.3 3745.4c54.227-66.827 80.373-158.61 85.467-269.07h-0.067v-217.88l0.1333-2.368c1.6-22.985-5.8533-40.819-17.467-51.827-5.7733-5.4666-12.533-9.2546-19.56-11.088-6.6133-1.7253-13.613-1.7093-20.307 0.296-12.173 3.652-23.933 14.356-32.133 33.708l-68.307-16.449c2.5733-33.608-9.3067-57.892-26.427-71.521-7.4533-5.9334-15.72-9.892-24-11.728-7.8133-1.7334-15.653-1.6347-22.747 0.4253-12.107 3.52-22.773 13.757-28.04 31.652l-69.84-10.037v-46.052c-4.5333-20.532-15.253-33.188-27.787-38.903-6.4267-2.9386-13.547-4.1693-20.64-3.792-6.9867 0.3694-13.787 2.3374-19.693 5.7974-10.987 6.4426-19.24 18.68-20.293 36.204l-71.24-2.092v-330.57c0-20.133-9.8533-32.267-22.613-37.227-6.04-2.36-12.733-3.48-19.533-3.44-6.8133 0.053-13.707 1.3467-20.107 3.8-14.52 5.6-26.027 18.133-26.027 36.867v634.29l-55.613-37.508c-17.76-11.977-40.147-29.647-62.507-47.304-35.72-28.2-70.853-56.541-71.147-56.476l-9.3334 0.836c-17.227-0.7267-32.6 2.588-43.747 9.808-5.36 3.472-9.76 7.9147-12.8 13.272-3.2667 5.724-5.2534 12.783-5.6 21.179-0.9467 22.241 8.4666 52.015 32.707 89.652 25.4 35.541 55.053 70.595 84.707 105.65 62.24 73.56 124.49 147.12 157.87 236.52l0.4266 1.1067c18.28 54.187 45.627 90.693 81.2 111.08 35.96 20.6 81.933 25.853 136.95 17.227l1.2533-0.28c119.91-14.28 203.07-57.48 256.87-123.76zm156.63-267.53c-5.5733 126.11-36.547 232.47-101.41 312.41-65.56 80.773-164.04 133.07-303.72 149.69l-0.013-0.08c-70.773 10.893-131.79 2.9733-181.96-25.787-50.813-29.133-88.96-78.533-113.19-150.17-29.027-77.04-87.147-145.75-145.27-214.43-30.52-36.08-61.053-72.16-88.6-110.77l-0.84-1.2533c-33.413-51.576-46.227-95.969-44.693-132.06 0.8534-20.377 6.1067-38.26 14.8-53.524 8.8934-15.629 21.2-28.253 35.933-37.803 23.2-15.031 52.267-22.233 83.067-21.317 32.48-1.1774 78.227 34.932 123.96 71.052l2.7067 2.1306v-495.85c0-52.747 31.693-87.787 71.76-103.21 14.373-5.5467 29.947-8.4267 45.467-8.5467 15.533-0.1067 31.107 2.5733 45.467 8.1733 38.56 15.027 68.333 49.08 68.333 103.59v227.44c11.587-4.5613 23.84-7.2147 36.227-7.8747 18.08-0.9626 36.627 2.352 53.827 10.208 25.787 11.761 48.147 33.364 60.787 65.508 5.0267-2.3226 10.213-4.2506 15.533-5.796 18.653-5.4213 38.56-5.824 57.88-1.5426 18.84 4.1813 37.12 12.759 52.973 25.389 16.307 12.985 30.267 30.203 39.88 51.233 7.2-4.064 14.68-7.2227 22.32-9.512 19.307-5.784 39.427-5.8373 58.493-0.86 18.667 4.8667 36.2 14.563 50.787 28.376 25.507 24.156 42.16 60.84 39.64 105.9v217.76l-0.1467 1.5334"/>
                            <path d="m3784.3 3745.4c54.227-66.827 80.373-158.61 85.467-269.07h-0.067v-217.88l0.1333-2.368c1.6-22.985-5.8533-40.819-17.467-51.827-5.7733-5.4666-12.533-9.2546-19.56-11.088-6.6133-1.7253-13.613-1.7093-20.307 0.296-12.173 3.652-23.933 14.356-32.133 33.708l-68.307-16.449c2.5733-33.608-9.3067-57.892-26.427-71.521-7.4533-5.9334-15.72-9.892-24-11.728-7.8133-1.7334-15.653-1.6347-22.747 0.4253-12.107 3.52-22.773 13.757-28.04 31.652l-69.84-10.037v-46.052c-4.5333-20.532-15.253-33.188-27.787-38.903-6.4267-2.9386-13.547-4.1693-20.64-3.792-6.9867 0.3694-13.787 2.3374-19.693 5.7974-10.987 6.4426-19.24 18.68-20.293 36.204l-71.24-2.092v-330.57c0-20.133-9.8533-32.267-22.613-37.227-6.04-2.36-12.733-3.48-19.533-3.44-6.8133 0.053-13.707 1.3467-20.107 3.8-14.52 5.6-26.027 18.133-26.027 36.867v634.29l-55.613-37.508c-17.76-11.977-40.147-29.647-62.507-47.304-35.72-28.2-70.853-56.541-71.147-56.476l-9.3334 0.836c-17.227-0.7267-32.6 2.588-43.747 9.808-5.36 3.472-9.76 7.9147-12.8 13.272-3.2667 5.724-5.2534 12.783-5.6 21.179-0.9467 22.241 8.4666 52.015 32.707 89.652 25.4 35.541 55.053 70.595 84.707 105.65 62.24 73.56 124.49 147.12 157.87 236.52l0.4266 1.1067c18.28 54.187 45.627 90.693 81.2 111.08 35.96 20.6 81.933 25.853 136.95 17.227l1.2533-0.28c119.91-14.28 203.07-57.48 256.87-123.76zm156.63-267.53c-5.5733 126.11-36.547 232.47-101.41 312.41-65.56 80.773-164.04 133.07-303.72 149.69l-0.013-0.08c-70.773 10.893-131.79 2.9733-181.96-25.787-50.813-29.133-88.96-78.533-113.19-150.17-29.027-77.04-87.147-145.75-145.27-214.43-30.52-36.08-61.053-72.16-88.6-110.77l-0.84-1.2533c-33.413-51.576-46.227-95.969-44.693-132.06 0.8534-20.377 6.1067-38.26 14.8-53.524 8.8934-15.629 21.2-28.253 35.933-37.803 23.2-15.031 52.267-22.233 83.067-21.317 32.48-1.1774 78.227 34.932 123.96 71.052l2.7067 2.1306v-495.85c0-52.747 31.693-87.787 71.76-103.21 14.373-5.5467 29.947-8.4267 45.467-8.5467 15.533-0.1067 31.107 2.5733 45.467 8.1733 38.56 15.027 68.333 49.08 68.333 103.59v227.44c11.587-4.5613 23.84-7.2147 36.227-7.8747 18.08-0.9626 36.627 2.352 53.827 10.208 25.787 11.761 48.147 33.364 60.787 65.508 5.0267-2.3226 10.213-4.2506 15.533-5.796 18.653-5.4213 38.56-5.824 57.88-1.5426 18.84 4.1813 37.12 12.759 52.973 25.389 16.307 12.985 30.267 30.203 39.88 51.233 7.2-4.064 14.68-7.2227 22.32-9.512 19.307-5.784 39.427-5.8373 58.493-0.86 18.667 4.8667 36.2 14.563 50.787 28.376 25.507 24.156 42.16 60.84 39.64 105.9v217.76l-0.1467 1.5334"/>
                            <path d="m3381.3 3100.7c0-19.708 15.973-35.687 35.693-35.687 19.707 0 35.68 15.979 35.68 35.687v152.39c0 19.712-15.973 35.689-35.68 35.689-19.72 0-35.693-15.977-35.693-35.689v-152.39"/>
                            <path d="m3541 3149.5c0-19.711 15.973-35.687 35.68-35.687 19.72 0 35.693 15.976 35.693 35.687v167.39c0 19.709-15.973 35.688-35.693 35.688-19.707 0-35.68-15.979-35.68-35.688v-167.39"/>
                            <path d="m3711.9 3213.4c0-19.711 15.973-35.688 35.68-35.688s35.693 15.977 35.693 35.688v167.4c0 19.708-15.987 35.685-35.693 35.685-19.707 0-35.68-15.977-35.68-35.685v-167.4"/>
                            <path d="m3139.4 3034.6 6.3867-15.315c-35.16-27.021-63.853-60.827-84.72-98.913-25.147-45.933-38.933-98.12-38.933-152.2 0-87.453 35.453-166.64 92.773-223.95 57.307-57.32 136.49-92.76 223.95-92.76 87.453-0.013 166.64 35.44 223.95 92.76 57.32 57.307 92.76 136.49 92.773 223.95 0 52.827-13.147 103.88-37.227 149.04-10.013 18.775-21.92 36.541-35.56 53.005 4.52 2.9494 8.8666 6.1134 13.027 9.476 14.053-17.081 26.347-35.487 36.707-54.921 25.347-47.533 39.173-101.17 39.187-156.6-0.013-91.907-37.267-175.12-97.493-235.36-60.24-60.227-143.45-97.493-235.36-97.48-91.907-0.013-175.12 37.253-235.36 97.48-60.227 60.24-97.493 143.45-97.493 235.36 0 56.76 14.493 111.59 40.947 159.88 22.6 41.256 53.947 77.729 92.453 106.55zm36.733-156.51v-29.667l-0.5867-1.0666c-14.773-26.973-22.867-57.653-22.867-89.453 0-51.413 20.84-97.96 54.52-131.64 33.693-33.693 80.24-54.533 131.65-54.533 51.4 0 97.96 20.84 131.64 54.533 33.693 33.68 54.533 80.227 54.533 131.64 0 31.067-7.72 61.08-21.867 87.613-1.5867 2.9866-3.2533 5.92-5.0133 8.8v28.253c7.2533-9.2667 13.667-19.147 19.187-29.493 15.413-28.893 23.827-61.507 23.827-95.173 0-55.867-22.64-106.44-59.253-143.05-36.613-36.6-87.187-59.253-143.05-59.253-55.867 0-106.44 22.64-143.05 59.253-36.613 36.613-59.253 87.187-59.253 143.05 0 34.48 8.8 67.8 24.893 97.16v0.04c4.36 7.9734 9.28 15.653 14.693 22.987zm-16.56 108.12c-26.267-21.64-48.227-47.715-65-76.797-24.387-42.227-37.853-90.693-37.853-141 0-77.907 31.587-148.44 82.64-199.49 51.053-51.053 121.59-82.64 199.49-82.64 77.907 0 148.44 31.587 199.49 82.64 51.053 51.053 82.64 121.59 82.64 199.49 0 50.307-13.467 98.773-37.84 141-9.1867 15.907-19.92 30.913-32.053 44.789-11.547-4.3106-23.56-7.2693-35.76-8.8293 15.613-15.56 29.027-33.053 39.947-51.96 21.547-37.307 33.427-80.267 33.427-125 0-69-27.96-131.47-73.173-176.68-45.213-45.213-107.68-73.173-176.68-73.173s-131.47 27.96-176.68 73.173c-45.213 45.213-73.187 107.68-73.187 176.68 0 44.733 11.893 87.693 33.44 125 13.227 22.92 30.12 43.747 50.16 61.584l-13.013 31.213"/>
                        </g>
                    </svg>
                    <p className="text-center">Click any transaction to view in detail...</p>
                </div>  
            </div>
        </article>
    );
}