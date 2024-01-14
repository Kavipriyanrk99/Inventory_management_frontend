import { useState, useEffect } from "react";
import Search from "./Search";
import User from "./User";
import { UnitsMetricsCard, PriceMetricsCard} from "./MetricsCard";
import { ProductTable } from "./Table";

const Product = ({ products, setProducts}) => {
    const [search, setSearch] = useState('');

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
                        />
                        <PriceMetricsCard 
                            stockWorth={1000}
                        />
                    </article>
                </article>
                <article className="flex flex-col gap-2 pt-6">
                    <h2 className="text-xl font-bold">
                        Product List
                    </h2>
                    <ProductTable
                        products={products.filter(product => (product.productName).toLowerCase().includes(search.toLowerCase().trim()))}
                    />
                </article>
            </section>
        </section>
    );
}

export default Product;