import { useState, useEffect } from "react";
import Search from "./Search";
import User from "./User";

const Product = () => {
    const [search, setSearch] = useState(null);

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
        </section>
    );
}

export default Product;