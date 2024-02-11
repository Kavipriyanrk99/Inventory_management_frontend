import { useEffect, useState } from "react";
import Search from "./Search";
import User from "./User";
import TransactionList from "./TransactionList";
import { EmptyTransactionCard, TransactionMetricsCard } from "./MetricsCard";
import SortList from "./SortList";
import { DateFilter, PriceFilter, ProductFilter, QuantityFilter, TypeFilter } from "./Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SquareSpinnerAnimation } from "./IsLoadingAnimation";
import { NoDataFound, SomethingWentWrong } from "./Errors";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const GET_TRANSACTION_URI = '/transactions';

const Transaction = () => {
    const axiosPrivate = useAxiosPrivate();
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
    const [filterByProduct, setFilterByProduct] = useState('');

    const [filterByType, setFilterByType] = useState('');

    const [filterByPriceFrom, setFilterByPriceFrom] = useState(0);
    const [filterByQuantityFrom, setFilterByQuantityFrom] = useState(0);

    const [filterByPriceTo, setFilterByPriceTo] = useState(0);
    const [filterByQuantityTo, setFilterByQuantityTo] = useState(0);

    const [filterApplyBtn, setFilterApplyBtn] = useState(false);

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
        let transactionsCpy = [...transactions];
        if(transactions.length > 0){
            const transactionsDateLowToHigh = [...transactions].sort((t1, t2) => new Date(t1.transactionDate) - new Date(t2.transactionDate));
            const lowestDate = transactionsDateLowToHigh[0].transactionDate.split('T')[0];
            const hightestDate = transactionsDateLowToHigh[transactionsDateLowToHigh.length - 1].transactionDate.split('T')[0];
    
            const dateRangeValidity = filterFromDate !== lowestDate || filterToDate !== hightestDate;
            const productValidity = filterByProduct !== '' && filterByProduct !== 'none'; 
            const typeValidity = filterByType !== '' && filterByType !== 'none';
            const priceValidity = filterByPriceFrom !== '' && filterByPriceTo !== '' && (parseFloat(filterByPriceFrom) !== 0.0 || parseFloat(filterByPriceTo) !== 0.0); 
            const quantityValidity = filterByQuantityFrom !== '' && filterByQuantityTo !== '' && (parseFloat(filterByQuantityFrom) !== 0.0 || parseFloat(filterByQuantityTo) !== 0.0); 
    
            const filteredItems = transactionsCpy.filter((transaction) => {
                let result = true;
                if(dateRangeValidity)
                    result = result && new Date(transaction.transactionDate) >= new Date(filterFromDate) && new Date(transaction.transactionDate) <= new Date(filterToDate);
    
                if(productValidity)
                    result = result && transaction.productID === filterByProduct;
    
                if(typeValidity)
                    result = result && transaction.transactionType === filterByType;
    
                if(priceValidity)
                    result = result && parseFloat(transaction.unitPrice) >= parseFloat(filterByPriceFrom) && parseFloat(transaction.unitPrice) <= parseFloat(filterByPriceTo);
    
                if(quantityValidity)
                    result = result && parseInt(transaction.quantity) >= parseInt(filterByQuantityFrom) && parseInt(transaction.quantity) <= parseInt(filterByQuantityTo);
                
                return result;
            });
            
            console.log(filteredItems);
            setSortedTransactions(filteredItems); 
            transactionsCpy = [...filteredItems];
        }

        switch(sortOrder){
            case 'dateNewToOld':
                setSortedTransactions([...transactionsCpy].sort((t1, t2) => new Date(t2.transactionDate) - new Date(t1.transactionDate)));
                break;

            case 'dateOldToNew':
                setSortedTransactions([...transactionsCpy].sort((t1, t2) => new Date(t1.transactionDate) - new Date(t2.transactionDate)));
                break;

            case 'quantityHighToLow':
                setSortedTransactions([...transactionsCpy].sort((t1, t2) => parseInt(t2.quantity) - parseInt(t1.quantity)));
                break;

            case 'quantityLowToHigh':
                setSortedTransactions([...transactionsCpy].sort((t1, t2) => parseInt(t1.quantity) - parseInt(t2.quantity)));
                break;

            case 'priceHighToLow':
                setSortedTransactions([...transactionsCpy].sort((t1, t2) => parseInt(t2.unitPrice) - parseInt(t1.unitPrice)));
                break;
            
            case 'priceLowToHigh':
                setSortedTransactions([...transactionsCpy].sort((t1, t2) => parseInt(t1.unitPrice) - parseInt(t2.unitPrice)));
                break;

            default:
                setSortedTransactions([...transactionsCpy].reverse());
        }   
    }, [sortOrder, filterApplyBtn]);

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
                const response = await axiosPrivate.get(GET_TRANSACTION_URI);

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

    const handleClearBtnClk = () => {
        const transactionsDateLowToHigh = [...transactions].sort((t1, t2) => new Date(t1.transactionDate) - new Date(t2.transactionDate));
        const lowestDate = transactionsDateLowToHigh[0].transactionDate.split('T')[0];
        const hightestDate = transactionsDateLowToHigh[transactionsDateLowToHigh.length - 1].transactionDate.split('T')[0];

        setFilterFromDate(lowestDate);
        setFilterToDate(hightestDate);
        setFilterByProduct('');
        setFilterByType('');
        setFilterByPriceFrom(0);
        setFilterByPriceTo(0);
        setFilterByQuantityFrom(0);
        setFilterByPriceTo(0);
        setSortedTransactions([...transactions].reverse());
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
                    <article className="flex my-2 justify-between">
                        <div className="flex gap-12">
                            <DateFilter
                                fromDate={filterFromDate}
                                setFromDate={setFilterFromDate}
                                toDate={filterToDate}
                                setToDate={setFilterToDate} 
                            />
                            <ProductFilter 
                                productFilterList={productFilterList}
                                filterByProduct={filterByProduct}
                                setFilterByProduct={setFilterByProduct}
                            />
                            <TypeFilter 
                                filterByType={filterByType}
                                setFilterByType={setFilterByType}
                            />
                            <PriceFilter
                                filterByPriceFrom={filterByPriceFrom}
                                setFilterByPriceFrom={setFilterByPriceFrom}
                                filterByPriceTo={filterByPriceTo}
                                setFilterByPriceTo={setFilterByPriceTo}
                            />
                            <QuantityFilter
                                filterByQuantityFrom={filterByQuantityFrom}
                                setFilterByQuantityFrom={setFilterByQuantityFrom}
                                filterByQuantityTo={filterByQuantityTo}
                                setFilterByQuantityTo={setFilterByQuantityTo}
                            />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setFilterApplyBtn(!filterApplyBtn)} className="w-24 py-1 px-2 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90">
                                <span className="px-2 font-semibold">Apply</span>
                                <FontAwesomeIcon icon={faFilter}/>
                            </button>
                            <button onClick={handleClearBtnClk}  className="w-24 py-1 px-2 rounded-2xl bg-gradient-to-b from-red-400 to-red-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90">
                                <span className="px-2 font-semibold">Clear</span>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
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
                <article className="flex gap-8 justify-center">
                    {   
                        isTransactionsLoading && 
                        <SquareSpinnerAnimation />
                    }
                    { 
                        transactionsFetchError && transactionsFetchError === "No transactions found!" && 
                        <NoDataFound />
                        
                    }
                    { 
                        transactionsFetchError && transactionsFetchError === "No server response!" && 
                        <SomethingWentWrong />
                    }
                    {
                        !isTransactionsLoading &&
                        !transactionsFetchError &&
                        <>
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
                        </>
                    }       
                </article>
            </section>
        </section>
    );
}

export default Transaction;