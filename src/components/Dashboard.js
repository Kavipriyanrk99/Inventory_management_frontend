import { useEffect, useState } from "react";
import { inboundMovementFinder, outboundMovementFinder, stockUnitsFinder, stockWorthFinder } from "../utils/stockMetrics";
import { MetricsCard, MovementsMetricsCard } from "./MetricsCard";
import User from "./User";
import { getMonthName } from "../utils/date";
import { SquareSpinnerAnimation } from "./IsLoadingAnimation";
import { NoDataFound, SomethingWentWrong } from "./Errors";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const GET_PRODUCT_URI = '/products';
const GET_TRANSACTION_URI = '/transactions';

const Dashboard = ({ products, setProducts }) => {
    const axiosPrivate = useAxiosPrivate();

    const [productFetchError, setProductFetchError] = useState(null);
    const [isProductLoading, setIsProductLoading]   = useState(true);
    const [stockUnits, setStockUnits] = useState(0);
    const [stockWorth, setStockWorth] = useState(0);

    const [transactions, setTransactions] = useState([]);
    const [transactionsFetchError, setTransactionsFetchError] = useState(null);
    const [isTransactionsLoading, setIsTransactionsLoading]   = useState(true);

    useEffect(() => {
        productsFetch();
        transactionsFetch();
    }, []);

    useEffect(() => {
        setStockWorth(stockWorthFinder(products));
        setStockUnits(stockUnitsFinder(products));
    }, [products]);

    const productsFetch = async() => {
        try{
            const response = await axiosPrivate.get(GET_PRODUCT_URI);

            if(response?.status === 200){
                setProducts(response.data);
                setProductFetchError(null);
            }
        } catch(err){
            if (!err?.response) {
                setProductFetchError('No server response!');
            } else {
                setProductFetchError(err.response.data.message);
            }
        } finally{
            setIsProductLoading(false);
        }
    }

    const transactionsFetch = async() => {
        try{
            const response = await axiosPrivate.get(GET_TRANSACTION_URI);

            if(response?.status === 200){
                setTransactions(response.data.reverse());
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
    }

    return(
        <section className="w-full py-4">
            <article className="flex justify-between">
                <h1 className="min-w-56 px-3 py-1.5 m-2 text-3xl font-bold">
                    Dashboard
                </h1>
                <div className="flex">
                    <User
                        username={'Kavipriyan'} 
                    />
                </div>
            </article>
            <section className="w-full p-5">
                <article className="flex flex-col gap-2 py-2">
                    <h2 className="text-xl font-bold">
                        Overview
                    </h2>
                    <article className="flex gap-16">
                        <MetricsCard
                            isProductLoading={isProductLoading}
                            productFetchError={productFetchError}
                            type={"products"}
                            data={products?.length}
                        />
                        <MetricsCard
                            isProductLoading={isProductLoading}
                            productFetchError={productFetchError}
                            type={"stockUnits"}
                            data={stockUnits}
                        />
                        <MetricsCard
                            isProductLoading={isProductLoading}
                            productFetchError={productFetchError}
                            type={"stockWorth"}
                            data={stockWorth}
                        />
                        <MovementsMetricsCard
                            isProductLoading={isProductLoading}
                            productFetchError={productFetchError}
                            inPercentage={inboundMovementFinder(products)}
                            outPercentage={outboundMovementFinder(products)}
                        />
                    </article>
                </article>
                <section className="w-full pt-6 flex flex-col gap-2">
                    <article className="w-1/2">
                        <h2 className="text-xl font-bold">
                           Last 5 transactions 
                        </h2>
                    </article>
                    <article className="w-1/2">
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
                            [...transactions].map((transaction, index) => (
                                index < 5 && 
                                <div key={transaction.transactionID}  className="flex items-center my-2 px-6 py-4 bg-raisinblack rounded-lg">
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
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </article>
                </section>
            </section>
        </section>
    );
}

export default Dashboard;