import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock,faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";

export const ProductTable = ({ products }) => {
    return(
        <table className="table-fixed w-full">
            <thead>
                <tr className="text-left text-blue-600">
                    <th className="py-4 text-sm">Product Id</th>
                    <th className="py-4 text-sm w-48">Product Name</th>
                    <th className="py-4 text-sm">Barcode</th>
                    <th className="py-4 text-sm">Date</th>
                    <th className="py-4 text-sm">Unit Price</th>
                    <th className="py-4 text-sm">Inbound</th>
                    <th className="py-4 text-sm">Outbound</th>
                    <th className="py-4 text-sm">Stock Quantity</th>
                    <th className="py-4 text-sm">Stock Price</th>
                    <th className="py-4 text-sm"></th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product) => (
                                    <tr key={product.productID} className="text-lg font-bold">
                                        <td className="py-4">{product.productID}</td>
                                        <td className="py-4 flex flex-col">
                                            <span>{product.productName}</span>
                                            <span className="text-sm text-slate-400 font-normal text-wrap">{product.description}</span>
                                        </td>
                                        <td className="py-4">{product.barcode ? product.barcode : 'Nil'}</td>
                                        <td className="py-4">
                                            <span>{product.date.split('T')[0]}</span>
                                            <div>
                                                <FontAwesomeIcon icon={faClock} className="text-sm text-yellow-400 pr-1.5"/>
                                                <span className="text-sm text-slate-400 font-normal">{product.date.split('T')[1].slice(0, -5)}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">{product.unitPrice}</td>
                                        <td className="py-4">{product.totalInbound}</td>
                                        <td className="py-4">{product.totalOutbound}</td>
                                        <td className="py-4">{product.quantityInStock}</td>
                                        <td className="py-4">{parseFloat(product.unitPrice) * parseInt(product.quantityInStock)}</td>
                                        <td className="py-4 text-right">
                                            <FontAwesomeIcon icon={faPenToSquare} className='p-2 mr-2 rounded-lg bg-gradient-to-b from-green-400 to-green-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90'/>
                                            <FontAwesomeIcon icon={faTrash} className='p-2 ml-2 rounded-lg bg-gradient-to-b from-red-400 to-red-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90'/>
                                        </td>
                                    </tr> 
                                ))
                }
            </tbody>
        </table>
    );
}

export const TransactionTable = () => {

}