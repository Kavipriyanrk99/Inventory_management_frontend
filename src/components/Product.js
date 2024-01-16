import { useState, useEffect } from "react";
import Search from "./Search";
import User from "./User";
import { UnitsMetricsCard, PriceMetricsCard} from "./MetricsCard";
import { ProductTable } from "./Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddForm from "./AddForm";
import axios from "../API/axios";
import { SquareSpinnerAnimation } from "./IsLoadingAnimation";
import { NoDataFound } from "./Errors";

const GET_PRODUCT_URI = '/products';

const Product = ({ products, setProducts}) => {
    const [search, setSearch] = useState('');
    const [addBtnClk, setAddBtnClk] = useState({'clicked' : false});
    const [productFetchError, setProductFetchError] = useState(null);
    const [isProductLoading, setIsProductLoading]   = useState(true);

    useEffect(() => {
        productsFetch();
    }, []);

    const productsFetch = () => {
        setTimeout(async () => {
            try{
                const response = await axios.get(GET_PRODUCT_URI);

                if(response?.status === 200){
                    setProducts(response.data);
                    setProductFetchError(null);
                }
            } catch(err){
                console.log(err);
                if (!err?.response) {
                    setProductFetchError('No Server Response');
                } else {
                    setProductFetchError(err.response.data.message);
                }
            } finally{
                setIsProductLoading(false);
            }
          }, 5000);
    }

    const handleAddBtnClk = () => {
        setAddBtnClk({'clicked' : !addBtnClk.clicked});
    }

    return(
        <section className="w-full py-4">
            <article className="flex justify-between">
                <h1 className="min-w-56 px-3 py-1.5 m-2 text-3xl font-bold">
                    Product
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
                        Stock Metrics
                    </h2>
                    <article className="flex gap-16">
                        <UnitsMetricsCard 
                            stockUnits={50}
                            isProductLoading={isProductLoading}
                            productFetchError={productFetchError}
                        />
                        <PriceMetricsCard 
                            stockWorth={1000}
                            isProductLoading={isProductLoading}
                            productFetchError={productFetchError}
                        />
                    </article>
                </article>
                <article className="w-full pt-6 flex flex-col gap-2">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold">
                            Product List
                        </h2>
                        <button className="w-24 py-1 px-2 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90" onClick={handleAddBtnClk}>
                            <span className="px-2 font-semibold">Add</span>
                            <FontAwesomeIcon icon={faPlusCircle}/>
                        </button>
                        {addBtnClk.clicked && 
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-raisinblack bg-opacity-20 backdrop-blur-md drop-shadow-lg z-10">
                                <AddForm 
                                    products={products}
                                    setProducts={setProducts}
                                    handleAddBtnClk={handleAddBtnClk}
                                />
                            </div> 
                        }
                    </div>
                    { isProductLoading && <SquareSpinnerAnimation />}
                    { productFetchError && <NoDataFound />}
                    {
                        !isProductLoading && 
                        !productFetchError && 
                        <div className="mt-4 px-8 py-2 max-h-[500px] border-2 border-raisinblack rounded-lg overflow-y-auto relative">
                            <ProductTable
                                products={products.filter(product => (product.productName).toLowerCase().includes(search.toLowerCase().trim()))}
                            />
                        </div>
                        
                    }
                </article>
            </section>
        </section>
    );
}

export default Product;