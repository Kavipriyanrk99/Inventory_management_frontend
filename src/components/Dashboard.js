import { useEffect, useState } from "react";
import { inboundMovementFinder, outboundMovementFinder, stockUnitsFinder, stockWorthFinder } from "../utils/stockMetrics";
import { MetricsCard, MovementsMetricsCard } from "./MetricsCard";
import User from "./User";
import axios from "../API/axios";

const GET_PRODUCT_URI = '/products';

const Dashboard = ({ products, setProducts }) => {
    const [productFetchError, setProductFetchError] = useState(null);
    const [isProductLoading, setIsProductLoading]   = useState(true);
    const [stockUnits, setStockUnits] = useState(0);
    const [stockWorth, setStockWorth] = useState(0);

    useEffect(() => {
        productsFetch();
    }, []);

    useEffect(() => {
        setStockWorth(stockWorthFinder(products));
        setStockUnits(stockUnitsFinder(products))
    }, [products]);

    const productsFetch = () => {
        setTimeout(async () => {
            try{
                const response = await axios.get(GET_PRODUCT_URI);

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
          }, 1000);
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
            </section>
        </section>
    );
}

export default Dashboard;