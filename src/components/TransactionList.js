import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMonthName } from "../utils/date";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { NoDataFound } from "./Errors";

const TransactionList = ({ transactions, pointerPosID, setPointerPosID }) => {
    return(
        transactions.length > 0 ?
            <article className="w-4/6 h-full">
                <div className="flex px-6 py-2 text-xs uppercase text-slate-400">
                    <p className="w-1/4">
                        Date
                    </p>
                    <div className="flex w-3/4">
                        <p className="w-4/5">Product</p>
                        <p className="w-1/5">Type</p>
                    </div>
                </div>
                <article className="max-h-[550px] overflow-y-auto">
                    {
                        [...transactions].map((transaction) => (
                            <div key={transaction.transactionID} onClick={() => setPointerPosID(transaction.transactionID)}  className="flex items-center my-2 px-6 py-4 bg-raisinblack rounded-lg hover:cursor-pointer">
                                <p className="w-1/4 font-semibold">
                                    <span>{getMonthName(transaction.transactionDate.split('T')[0]).slice(0, 3) + "."} </span>
                                    <span>{transaction.transactionDate.split('T')[0].split('-')[2]}</span>
                                </p>
                                <div className="flex items-center w-3/4">
                                    <div className="w-4/5">
                                        <p>{transaction.productName}</p>
                                        <p className="text-xs font-bold text-slate-400">{transaction.productID}</p>
                                    </div>
                                    <div className="w-1/5 flex justify-between items-center">
                                        {
                                            transaction.transactionType === "CREATED" &&
                                                <p className="w-24 h-8 flex justify-center items-center text-xs font-bold text-blue-600 border-2 border-blue-600 rounded-2xl">              
                                                    {transaction.transactionType}
                                                </p>
                                        }
                                        {
                                            transaction.transactionType === "UPDATED" &&
                                                <p className="w-24 h-8 flex justify-center items-center text-xs font-bold text-orange-500 border-2 border-orange-500 rounded-2xl">              
                                                    {transaction.transactionType}
                                                </p>
                                        }
                                        {
                                            transaction.transactionType === "IN" &&
                                                <p className="w-24 h-8 flex justify-center items-center text-xs font-bold text-green-400 border-2 border-green-400 rounded-2xl">              
                                                    {transaction.transactionType}
                                                </p>
                                        }
                                        {
                                            transaction.transactionType === "OUT" &&
                                                <p className="w-24 h-8 flex justify-center items-center text-xs font-bold text-red-500 border-2 border-red-500 rounded-2xl">              
                                                    {transaction.transactionType}
                                                </p>
                                        }
                                        <FontAwesomeIcon icon={faPlay} className={pointerPosID === transaction.transactionID ? (transaction.transactionType === "CREATED" ?"text-blue-600" : (transaction.transactionType === "UPDATED" ? "text-orange-500" : (transaction.transactionType === "IN" ? "text-green-400" : "text-red-500"))) : "text-raisinblack"} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </article>
            </article> :
            <div className="w-full pt-6 flex justify-center">
                <NoDataFound />
            </div>
    );
}

export default TransactionList;