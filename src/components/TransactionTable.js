import { getMonthName } from "../utils/date";

const TransactionTable = ({ transactions }) => {
    return(
        <table className="w-full text-sm text-left rtl:text-right text-slate-400 border-separate border-spacing-y-2">
                <thead className="text-xs uppercase text-slate-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 w-3/5">
                            <div className="flex items-start">
                                Product
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Type
                            </div>
                        </th>
                        <th scope="col">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction) => (
                                        <tr key={transaction.transactionID} className="bg-raisinblack text-white font-bold cursor-pointer">
                                            <td className="px-6 py-4 rounded-l-md">
                                                <span>{ getMonthName(transaction.transactionDate.split('T')[0]) + " " + transaction.transactionDate.split('T')[0].split('-')[2]}</span>
                                            </td>
                                            <td className="px-6 py-4 flex flex-col">
                                                <span>{transaction.productName}</span>
                                                <span className="text-sm text-slate-400 font-normal text-wrap">{transaction.productID}</span>
                                            </td>
                                            <td className="px-6 py-4 font-bold whitespace-nowrap text-white rounded-r-md">
                                                {
                                                    transaction.transactionType === "CREATED" &&
                                                        <span className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-2xl">
                                                            CREATED
                                                        </span>

                                                }
                                                {
                                                    transaction.transactionType === "UPDATED" &&
                                                        <span className="px-4 py-2 border-2 border-orange-500 text-xs text-orange-500 rounded-2xl">
                                                            UPDATED
                                                        </span>

                                                }
                                                {
                                                    transaction.transactionType === "IN" &&
                                                        <span className="px-4 py-2 border-2 border-green-500 text-xs text-green-500 rounded-2xl">
                                                            IN
                                                        </span>
                                                }
                                                {
                                                    transaction.transactionType === "OUT" &&
                                                        <span className="px-4 py-2 border-2 border-red-600 text-xs text-red-600 rounded-2xl">
                                                            IN
                                                        </span>
                                                }
                                            </td>
                                        </tr> 
                                    ))
                    }
                </tbody>
        </table>
    );
}

export default TransactionTable;