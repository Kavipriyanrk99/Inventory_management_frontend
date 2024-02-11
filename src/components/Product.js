import { useState, useEffect } from "react";
import Search from "./Search";
import User from "./User";
import { UnitsMetricsCard, PriceMetricsCard} from "./MetricsCard";
import ProductTable from "./ProductTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SquareSpinnerAnimation } from "./IsLoadingAnimation";
import { NoDataFound, SomethingWentWrong } from "./Errors";
import { ProductDeleteAlert } from "./Alerts";

const GET_PRODUCT_URI = '/products';

const Product = ({ products, setProducts}) => {
    const axiosPrivate = useAxiosPrivate();
    const [search, setSearch] = useState('');
    const [addBtnClk, setAddBtnClk] = useState({'clicked' : false});
    const [editProduct, setEditProduct] = useState({
        'productID': '',
        'productName': '',
        'barcode': '',
        'unitPrice': '',
        'description': ''
    });
    const [delProduct, setDelProduct] = useState({
        'productID': '',
        'productName': ''
    });
    const [productFetchError, setProductFetchError] = useState(null);
    const [isProductLoading, setIsProductLoading]   = useState(true);
    const [stockUnits, setStockUnits] = useState(0);
    const [stockWorth, setStockWorth] = useState(0);

    useEffect(() => {
        productsFetch();
    }, []);

    useEffect(() => {
        stockWorthFinder();
        stockUnitsFinder();
    }, [products]);

    const productsFetch = () => {
        setTimeout(async () => {
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
          }, 5000);
    }

    const stockWorthFinder = () => {
        let price = 0;
        for(let index = 0; index < products.length; index++){
          price += parseFloat(products[index].unitPrice) * parseInt(products[index].quantityInStock);
        }
        setStockWorth(price);
    }
    
    const stockUnitsFinder = () => {
        let units = 0;
        for(let index = 0; index < products.length; index++){
            units += parseInt(products[index].quantityInStock);
        }
        setStockUnits(units);
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
                            stockUnits={stockUnits}
                            isProductLoading={isProductLoading}
                            productFetchError={productFetchError}
                        />
                        <PriceMetricsCard 
                            stockWorth={stockWorth}
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
                                    handleAddBtnClk={handleAddBtnClk}
                                    productsFetch={productsFetch}
                                />
                            </div> 
                        }
                    </div>
                    { isProductLoading && <SquareSpinnerAnimation />}
                    { productFetchError && productFetchError === "No Products found!" && <NoDataFound />}
                    { productFetchError && productFetchError === "No server response!" && <SomethingWentWrong />}
                    {
                        !isProductLoading && 
                        !productFetchError && 
                        <div className="max-h-[520px] overflow-y-auto rounded-lg">
                            <ProductTable
                                products={products.filter(product => (product.productName).toLowerCase().includes(search.toLowerCase().trim()))}
                                setDelProduct={setDelProduct}
                                setEditProduct={setEditProduct}
                            />
                        </div>
                        
                    }
                    {
                        delProduct.productID && delProduct.productName &&
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-raisinblack bg-opacity-20 backdrop-blur-md drop-shadow-lg z-10">
                                <ProductDeleteAlert 
                                    delProduct={delProduct}
                                    setDelProduct={setDelProduct}
                                    productsFetch={productsFetch}
                                />
                            </div> 
                    }
                    {
                        editProduct.productID &&
                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-raisinblack bg-opacity-20 backdrop-blur-md drop-shadow-lg z-10">
                                <EditForm 
                                    editProduct={editProduct}
                                    setEditProduct={setEditProduct}
                                    productsFetch={productsFetch}
                                />
                            </div> 
                    }
                </article>
            </section>
        </section>
    );
}

export default Product;