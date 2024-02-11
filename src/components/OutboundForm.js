import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { getIST, getISTMilitary, getUTC } from "../utils/date";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductSelectList from "./ProductSelectList";
import ProcessingIndicator from "./ProcessingIndicator";
import ServerMsgHeader from "./ServerMsgHeader";

const PRODUCT_OUTBOUND_URI = "products/outbound";

const OutboundForm = ({ products }) => {
    const axiosPrivate = useAxiosPrivate();
    const productSelectRef = useRef();
    
    const [date, setDate] = useState(getIST(new Date()).split('T')[0]);
    const [time, setTime] = useState(getISTMilitary(new Date()).split('T')[1]);

    const [outProduct, setOutProduct] = useState({
        productID: '',
        productName: ''
    });
    const [outProductFocus, setOutProductFocus] = useState(false);

    const [quantitySold, setQuantitySold] = useState(0);
    const [quantitySoldFocus, setQuantitySoldFocus] = useState(false);
    
    const [description, setDescription] = useState('');
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [formMsg, setFormMsg] = useState('');

    const [removeBtnClk, setRemoveBtnClk] = useState(false);
    const [isRemoving, setIsRemoving] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        productSelectRef.current.focus();
    }, []);

    useEffect(() => {
        setFormMsg('');
    }, [date, time, outProduct, quantitySold, description]);

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(!date || !time || !outProduct.productName || !quantitySold || !description || description.trim().length === 0){
            setFormMsg("fields can't be empty");
            return;
        }

        if(!outProduct.productID){
            setOutProductFocus(true);
            return;
        }

        if(parseInt(quantitySold) <= 0){
            setQuantitySoldFocus(true);
            return;
        }

        setRemoveBtnClk(true);
        try{
            const product = {
                productID : outProduct.productID,
                date : getUTC(date, time),
                quantitySold : quantitySold,
                description : description
            }
            
            const response = await axiosPrivate.patch( PRODUCT_OUTBOUND_URI, product);

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
            setIsRemoving(false);
        }
    }

    const handleReset = (event) => {
        event.preventDefault();

        setDate(getIST(new Date()).split('T')[0]);
        setTime(getISTMilitary(new Date()).split('T')[1]);
        setOutProduct({
            productID : '',
            productName : ''
        });
        setQuantitySold(0);
        setDescription('');
        setErrorMsg('');
        setSuccessMsg('');
        setRemoveBtnClk(false);
        setIsRemoving(true);
       
        productSelectRef.current.focus();
    }

    return(
        <section className="w-full p-5 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-2/5 p-4 bg-raisinblack border-4 border-blue-600 rounded-xl flex flex-col relative">
                <h2 className="text-xl font-bold py-4 pl-2">Remove Product</h2>
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
                            type="text"
                            placeholder="Choose a product"
                            ref={productSelectRef}
                            value={outProduct.productName}
                            onChange={(e) => setOutProduct({ productID : '', productName : e.target.value})}
                            onFocus={(e) => setOutProductFocus(true)}
                            onBlur={(e) => setOutProductFocus(false)}
                        ></input>
                        {outProductFocus && outProduct.productName && (outProduct.productName.trim().length === 0 || !outProduct.productID) && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid product name</p>}
                    </div>
                    <ProductSelectList
                        products={products?.filter((product) => product.productName.toLowerCase().includes(outProduct.productName.toLowerCase()))}
                        setProductInMovement={setOutProduct} 
                    />
                    <div className="w-fit h-fit flex flex-col gap-1.5" >
                        <label 
                            className="text-sm text-slate-400"
                            htmlFor="quantitySold"
                        >Quantity sold</label>
                        <input
                            className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                            id="quantitySold"
                            name="quantitySold"
                            type="number"
                            placeholder="Enter quantity sold"
                            value={quantitySold}
                            onChange={(e) => setQuantitySold(e.target.value)}
                            onFocus={() => setQuantitySoldFocus(true)}
                            onBlur={() => setQuantitySoldFocus(false)}
                        ></input>
                        {quantitySoldFocus && parseInt(quantitySold) <= 0 && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid quantity</p>}
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
                    >Remove</button>
                    <button 
                        className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-red-400 to-red-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                        onClick={handleReset}
                    >Clear</button>
                </div>
            </form>
            {
                removeBtnClk && isRemoving &&
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-raisinblack bg-opacity-20 backdrop-blur-md drop-shadow-lg z-10">
                    <ProcessingIndicator
                        title={quantitySold + " " + outProduct.productName + " is being removed"}
                        body={"Please wait for a moment."}
                    />
                </div>
            }
            {
                successMsg &&
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-raisinblack bg-opacity-20 backdrop-blur-md drop-shadow-lg z-10">
                    <div className="w-96 border-4 bg-raisinblack border-blue-600 rounded-xl p-4">
                        <ServerMsgHeader
                            type={"success"}
                            title={quantitySold + " " + outProduct.productName + " is successfully removed"}
                            body={"This product is successfully removed from inventory."}
                        />
                        <div className="flex mt-4 py-2 justify-evenly">
                            <button 
                                className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                onClick={handleReset} 
                            >Close</button>
                        </div>
                    </div>
                </div>
            }
            {
                errorMsg &&
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-raisinblack bg-opacity-20 backdrop-blur-md drop-shadow-lg z-10">
                    <div className="w-96 border-4 bg-raisinblack border-blue-600 rounded-xl p-4">
                        <ServerMsgHeader
                            type={"error"}
                            title={"Something went wrong"}
                            body={errorMsg} 
                        />
                        <div className="flex mt-4 py-2 justify-evenly">
                            <button 
                                className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                onClick={handleReset} 
                            >Close</button>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}

export default OutboundForm;