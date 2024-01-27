import { useEffect, useState } from "react";
import Search from "./Search";
import User from "./User";
import TransactionList from "./TransactionList";
import { EmptyTransactionCard, TransactionMetricsCard } from "./MetricsCard";
import SortList from "./SortList";
import axios from "../API/axios";
import { DateFilter, ProductFilter } from "./Filters";

const GET_TRANSACTION_URI = '/transactions';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [sortedTransactions, setSortedTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [pointerPosID, setPointerPosID] = useState('');
    const [transactionSelected, setTransactionSelected] = useState(null);
    const [sortOrder, setSortOrder] = useState('');
    const [transactionsFetchError, setTransactionsFetchError] = useState(null);
    const [isTransactionsLoading, setIsTransactionsLoading]   = useState(true);

    const [filterFromDate, setFilterFromDate] = useState('');
    const [filterToDate, setFilterToDate] = useState('');

    const [productFilterList, setProductFilterList] = useState([]);
    const [filterProductBy, setFilterProductBy] = useState('');

    useEffect(() => {
        transactionsFetch();
    }, []);

    useEffect(() => {
        if(transactions.length > 0){
            const transactionsDateLowToHigh = [...transactions].sort((t1, t2) => new Date(t1.transactionDate) - new Date(t2.transactionDate));
            const lowestDate = transactionsDateLowToHigh[0].transactionDate.split('T')[0];
            const hightestDate = transactionsDateLowToHigh[transactionsDateLowToHigh.length - 1].transactionDate.split('T')[0];
            setFilterFromDate(lowestDate);
            setFilterToDate(hightestDate);

            const uniqueProductIDs = new Set();
            const uniqueTransactions = transactions.filter(transaction => {
                if (!uniqueProductIDs.has(transaction.productID)) {
                    uniqueProductIDs.add(transaction.productID);
                    return true;
                }
                return false;
            });
    
            setProductFilterList(uniqueTransactions);
        }
    }, [transactions]);

    useEffect(() => {
        switch(sortOrder){
            case 'dateNewToOld':
                setSortedTransactions([...transactions].sort((t1, t2) => new Date(t2.transactionDate) - new Date(t1.transactionDate)));
                break;

            case 'dateOldToNew':
                setSortedTransactions([...transactions].sort((t1, t2) => new Date(t1.transactionDate) - new Date(t2.transactionDate)));
                break;

            case 'quantityHighToLow':
                setSortedTransactions([...transactions].sort((t1, t2) => parseInt(t2.quantity) - parseInt(t1.quantity)));
                break;

            case 'quantityLowToHigh':
                setSortedTransactions([...transactions].sort((t1, t2) => parseInt(t1.quantity) - parseInt(t2.quantity)));
                break;

            case 'priceHighToLow':
                setSortedTransactions([...transactions].sort((t1, t2) => parseInt(t2.unitPrice) - parseInt(t1.unitPrice)));
                break;
            
            case 'priceLowToHigh':
                setSortedTransactions([...transactions].sort((t1, t2) => parseInt(t1.unitPrice) - parseInt(t2.unitPrice)));
                break;

            default:
                setSortedTransactions([...transactions].reverse());
        }   

    }, [sortOrder]);

    useEffect(() => {
        const transaction = transactions.find(transaction => transaction.transactionID === pointerPosID);
        if(transaction)
            setTransactionSelected(transaction);
        else
            setTransactionSelected(null);
    }, [pointerPosID]);

    const transactionsFetch = () => {
        setTimeout(async () => {
            try{
                const response = await axios.get(GET_TRANSACTION_URI);

                if(response?.status === 200){
                    setTransactions(response.data);
                    setSortedTransactions([...response.data].reverse());
                    setTransactionsFetchError(null);
                }
            } catch(err){
                if (!err?.response) {
                    setTransactionsFetchError('No server response!');
                } else {
                    setTransactionsFetchError(err.response.data.message);
                }
            } finally{
                setIsTransactionsLoading(false);
            }
          }, 3000);
    }

    return(
        <section className="w-full py-4">
            <article className="flex justify-between">
                <h1 className="min-w-56 px-3 py-1.5 m-2 text-3xl font-bold">
                    Transaction
                </h1>
                <div className="flex">
                    <Search
                        search={search}
                        setSearch={setSearch}
                    />
                    <User
                        username={'Kavipriyan'} 
                    />
                </div>
            </article>
            <section className="w-full p-5">
                <article className="flex flex-col gap-2 py-2">
                    <h2 className="text-xl font-bold">
                        Filters
                    </h2>
                    <article className="flex gap-12 my-2">
                        <DateFilter
                            fromDate={filterFromDate}
                            setFromDate={setFilterFromDate}
                            toDate={filterToDate}
                            setToDate={setFilterToDate} 
                        />
                        <ProductFilter 
                            productFilterList={productFilterList}
                            filterProductBy={filterProductBy}
                            setFilterProductBy={setFilterProductBy}
                        />
                        <div className="w-32 h-8 bg-white flex justify-center items-center rounded-lg">
                            <span className="text-black">Product Name</span>
                        </div>
                    </article>
                </article>
                <article className="flex gap-2 justify-between items-center py-2 my-2 border-t-2 border-b-2 border-raisinblack">
                    <p className="py-6">
                        Showing {sortedTransactions.filter(transaction => (transaction.productName).toLowerCase().includes(search.toLowerCase().trim())).length} of {transactions.length} results
                    </p>
                    <SortList 
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                </article>
                <article className="flex gap-8">
                    <TransactionList 
                        transactions={sortedTransactions.filter(transaction => (transaction.productName).toLowerCase().includes(search.toLowerCase().trim()))}
                        pointerPosID={pointerPosID}
                        setPointerPosID={setPointerPosID}
                    />
                    <article className="w-2/6">
                        <div className="flex py-2 text-xs uppercase text-slate-400">
                            <h2 >
                                Transaction Details
                            </h2>
                        </div>
                        {
                            transactionSelected && 
                                <TransactionMetricsCard 
                                    transaction={transactionSelected}
                                    setPointerPosID={setPointerPosID}
                                />
                        }
                        {
                            !transactionSelected && 
                                <EmptyTransactionCard />
                        }
                    </article>
                </article>
            </section>
        </section>
    );
}

export default Transaction;