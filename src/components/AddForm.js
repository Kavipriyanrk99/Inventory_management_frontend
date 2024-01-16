import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const AddForm = ({ handleAddBtnClk }) => {
    const productNameRef = useRef();

    const [productName, setProductName] = useState('');
    const [productNameFocus, setProductNameFocus] = useState(false);

    const [barcode, setBarcode] = useState('');
    const [barcodeFocus, setBarcodeFocus] = useState(false);

    const [unitPrice, setUnitPrice] = useState(0);
    const [unitPriceFocus, setUnitPriceFocus] = useState(false);

    const [description, setDescription] = useState('');
    const [descriptionFocus, setDescriptionFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState(false);
    
    useEffect(() => {
        productNameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [productName, unitPrice, description]); // future add barcode

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!productName || !unitPrice || !description){
            setErrorMsg(true);
            return;
        }

        if(parseFloat(unitPrice) <= 0){
            setUnitPriceFocus(true);
            return;
        }

        console.log(productName + barcode + unitPrice + description);
    }

    return(
        <form className="w-96 p-4 bg-raisinblack border-2 border-blue-600 rounded-xl flex flex-col relative" onSubmit={handleSubmit}>
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-xl text-red-500 cursor-pointer active:opacity-90" onClick={handleAddBtnClk}/>
            <h2 className="text-xl font-bold py-4 pl-2">New Product</h2>
            {errorMsg && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>fields can't be empty</p>}
            <div className="flex flex-col gap-4 px-2">
                <div className="w-full h-fit flex flex-col gap-1.5">
                    <label 
                        className="text-sm text-slate-400" 
                        htmlFor="productName"
                    >Product Name</label>
                    <input
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                        id="productName"
                        name="productName"
                        type="text"
                        placeholder="Enter product name"
                        ref={productNameRef}
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        onFocus={(e) => setProductNameFocus(true)}
                        onBlur={(e) => setProductNameFocus(false)}
                    ></input>
                    {productNameFocus && productName && productName.trim().length === 0 && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid name</p>}
                </div>
                <div className="w-full h-fit flex flex-col gap-1.5" >
                    <label 
                        className="text-sm text-slate-400"
                        htmlFor="barcode"
                    >Barcode</label>
                    <input 
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                        id="barcode"
                        name="barcode"
                        type="text"
                        placeholder="Enter barcode"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        onFocus={(e) => setBarcodeFocus(true)}
                        onBlur={(e) => setBarcodeFocus(false)}
                        disabled
                    ></input>
                    {barcodeFocus && barcode && barcode.trim().length === 0 && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid code</p>}
                </div>
                <div className="w-full h-fit flex flex-col gap-1.5" >
                    <label 
                        className="text-sm text-slate-400"
                        htmlFor="unitPrice"
                    >Unit Price</label>
                    <input 
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                        id="unitPrice"
                        name="unitPrice"
                        type="number"
                        placeholder="Enter unit price"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        onFocus={(e) => setUnitPriceFocus(true)}
                        onBlur={(e) => setUnitPriceFocus(false)}
                    ></input>
                    {unitPriceFocus && parseFloat(unitPrice) <= 0 && <p className="text-sm text-red-400 px-4"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid price</p>}
                </div>
                <div className="w-full h-fit flex flex-col gap-1.5" >
                    <label 
                        className="text-sm text-slate-400"
                        htmlFor="description"
                    >Description</label>
                    <textarea 
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
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
                    className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                >Clear</button>
            </div>
        </form>
    );
}

export default AddForm;