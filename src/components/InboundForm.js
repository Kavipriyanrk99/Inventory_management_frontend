import { useEffect, useRef, useState } from "react";
import ProductSelectList from "./ProductSelectList";
import { getIST, getISTMilitary, getUTC } from "../utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../API/axios";
import { DotLoaderAnimation } from "./IsLoadingAnimation";

const PRODUCT_INBOUND_URI = "products/inbound"; 

const InboundForm = ({ products, setProducts }) => {
    const productSelectRef = useRef();

    const [date, setDate] = useState(getIST(new Date()).split('T')[0]);
    const [dateFocus, setDateFocus] = useState(false);

    const [time, setTime] = useState(getISTMilitary(new Date()).split('T')[1]);
    const [timeFocus, setTimeFocus] = useState(false);

    const [inProduct, setInProduct] = useState({
        productID : '',
        productName : ''
    });
    const [inProductFocus, setInProductFocus] = useState(false);

    const [quantityReceived, setQuantityReceived] = useState(0);
    const [quantityReceivedFocus, setQuantityReceivedFocus] = useState(false);
    
    const [description, setDescription] = useState('');
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [formMsg, setFormMsg] = useState('');

    const [addBtnClk, setAddBtnClk] = useState(false);
    const [isAdding, setIsAdding] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        productSelectRef.current.focus();
    }, []);

    useEffect(() => {
        setFormMsg('');
    }, [date, time, inProduct, quantityReceived, description]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(!date || !time || !inProduct.productName || !quantityReceived || !description || description.trim().length === 0){
            setFormMsg("fields can't be empty");
            return;
        }

        if(!inProduct.productID){
            setInProductFocus(true);
            return;
        }

        if(parseInt(quantityReceived) <= 0){
            setQuantityReceivedFocus(true);
            return;
        }

        setAddBtnClk(true);
        setTimeout(async() => {
            try{
                const product = {
                    productID : inProduct.productID,
                    date : getUTC(date, time),
                    quantityReceived : quantityReceived,
                    description : description
                }
                
                const response = await axios.patch( PRODUCT_INBOUND_URI, product, {
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if(response?.status === 201){
                    setSuccessMsg(response.data.message);
                    setErrorMsg('');
                }
            } catch(err){
                if (!err?.response) {
                    setErrorMsg('No Server Response');
                } else {
                    setErrorMsg(err.response.data.message);
                }
            } finally{
                setIsAdding(false);
            }
        }, 1000); 
    }

    const handleReset = (event) => {
        event.preventDefault();

        setDate(getIST(new Date()).split('T')[0]);
        setTime(getISTMilitary(new Date()).split('T')[1]);
        setInProduct({
            productID : '',
            productName : ''
        });
        setQuantityReceived(0);
        setDescription('');

        productSelectRef.current.focus();
    }

    return(
        <>
            {
                !addBtnClk &&
                <section className="w-full p-5 flex justify-center">
                    <form onSubmit={handleSubmit} className="w-2/5 p-4 bg-raisinblack border-4 border-blue-600 rounded-xl flex flex-col relative">
                        <h2 className="text-xl font-bold py-4 pl-2">Add Product</h2>
                        {formMsg && <p className="text-sm text-red-400 px-2 pb-2"><FontAwesomeIcon icon={faInfoCircle}/> {formMsg}</p>}
                            <div className="flex flex-col gap-4 px-2">
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <div className="w-fit h-fit flex gap-3 items-center">
                                            <label 
                                                className="text-sm text-slate-400" 
                                                htmlFor="date"
                                            >Date</label>
                                            <input
                                                className="w-auto h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                                                id="date"
                                                name="date"
                                                type="date"
                                                placeholder="Enter date"
                                                min={getIST(new Date()).split('T')[0]}
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                onFocus={(e) => setDateFocus(true)}
                                                onBlur={(e) => setDateFocus(false)}
                                            ></input>
                                        </div>   
                                    </div>
                                    <div className="w-1/2">
                                        <div className="w-fit h-fit flex gap-3 items-center3 items-center3 items-center" >
                                            <label 
                                                className="text-sm text-slate-400"
                                                htmlFor="time"
                                            >Time</label>
                                            <input 
                                                className="w-auto h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                                                id="time"
                                                name="time"
                                                type="time"
                                                placeholder="Enter time"
                                                min={getISTMilitary(new Date()).split('T')[1]}
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                onFocus={(e) => setTimeFocus(true)}
                                                onBlur={(e) => setTimeFocus(false)}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex flex-col gap-1.5" >
                                    <label 
                                        className="text-sm text-slate-400"
                                        htmlFor="productSelect"
                                    >Select</label>
                                    <input 
                                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                                        id="productSelect"
                                        name="productSelect"
                                        ref={productSelectRef}
                                        type="text"
                                        placeholder="Choose a product"
                                        value={inProduct.productName}
                                        onChange={(e) => setInProduct({ productID : '', productName : e.target.value})}
                                        onFocus={(e) => setInProductFocus(true)}
                                        onBlur={(e) => setInProductFocus(false)}
                                    ></input>
                                    {inProductFocus && inProduct.productName && (inProduct.productName.trim().length === 0 || !inProduct.productID) && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid product name</p>}
                                </div>
                                <ProductSelectList
                                    products={products?.filter((product) => product.productName.toLowerCase().includes(inProduct.productName.toLowerCase()))}
                                    setProductInMovement={setInProduct} 
                                />
                                <div className="w-fit h-fit flex flex-col gap-1.5" >
                                    <label 
                                        className="text-sm text-slate-400"
                                        htmlFor="quantityReceived"
                                    >Quantity received</label>
                                    <input
                                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                                        id="quantityReceived"
                                        name="quantityReceived"
                                        type="number"
                                        placeholder="Enter quantity received"
                                        value={quantityReceived}
                                        onChange={(e) => setQuantityReceived(e.target.value)}
                                        onFocus={(e) => setQuantityReceivedFocus(true)}
                                        onBlur={(e) => setQuantityReceivedFocus(false)}
                                    ></input>
                                    {quantityReceivedFocus && parseInt(quantityReceived) <= 0 && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid quantity</p>}
                                </div>
                                <div className="w-full h-fit flex flex-col gap-1.5" >
                                    <label 
                                        className="text-sm text-slate-400"
                                        htmlFor="description"
                                    >Description</label>
                                    <textarea 
                                        className="w-auto h-24 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        onFocus={(e) => setDescriptionFocus(true)}
                                        onBlur={(e) => setDescriptionFocus(false)} 
                                    ></textarea>
                                    {descriptionFocus && description && description.trim().length === 0 && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter description</p>}
                                </div>
                            </div>
                            <div className="flex justify-evenly mt-4 py-2">
                                <button
                                    className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                    type="submit"
                                >Add</button>
                                <button 
                                    className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-red-400 to-red-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                    onClick={handleReset}
                                >Clear</button>
                            </div>
                        </form>
                </section>
            }
            {
                addBtnClk && isAdding &&
                <div className="w-96 border-4 bg-raisinblack border-blue-600 rounded-xl p-4">
                    <div className="flex flex-col items-center">
                        <DotLoaderAnimation />
                        <h2 className="py-2 font-bold">{quantityReceived + " " + inProduct.productName} is being added</h2>
                        <p className="text-center text-sm text-slate-400">Please wait for a moment.</p>
                    </div>   
                </div>
            }
            {
                successMsg && 
                    <div className="w-96 border-4 bg-raisinblack border-blue-600 rounded-xl p-4">
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-3xl" beatFade />
                            <h2 className="py-2 font-bold">{quantityReceived + " " + inProduct.productName} is successfully added</h2>
                            <p className="text-center text-sm text-slate-400">This product is successfully added into inventory.</p>
                        </div>
                        <div className="flex mt-4 py-2 justify-evenly">
                            <button 
                                className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                
                            >Close</button>
                        </div>
                    </div>
            }
            {
                errorMsg && 
                <div className="w-96 border-4 bg-raisinblack border-blue-600 rounded-xl p-4">
                    <div className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faCircleXmark} className="text-red-600 text-3xl" />
                        <h2 className="py-2 font-bold">Something went wrong</h2>
                        <p className="text-center text-sm text-slate-400">{errorMsg}</p>
                    </div>
                    <div className="flex mt-4 py-2 justify-evenly">
                        <button 
                            className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                            
                        >Close</button>
                    </div>
                </div>
            }
        </>
        
    );
}

export default InboundForm;