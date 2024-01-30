const ProductSelectList = ({ products, setProductInMovement }) => {
    return(
        <ul className="w-full h-44 bg-black bg-opacity-40 rounded-lg overflow-y-auto">
            {
                products.length > 0 ? 
                    products.map((product) => (
                      <li
                        key={product.productID} 
                        onClick={() => setProductInMovement({ productID: product.productID, productName: product.productName})}
                        className="px-2 py-1 hover:bg-blue-500 hover:cursor-pointer"
                      >
                        <span>{product.productName}</span>
                        <span className="text-xs text-slate-400 p-2">{"[" + product.productID + "]"}</span>
                      </li>  
                    )) :
                    <p>No products</p>
            }
        </ul>
    );
}

export default ProductSelectList;