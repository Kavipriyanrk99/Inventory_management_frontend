import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DotLoaderAnimation } from "./IsLoadingAnimation";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const DELETE_PRODUCT_URI = 'products/newproduct';

export const ProductDeleteAlert = ({ delProduct, setDelProduct, productsFetch }) => {
    const axiosPrivate = useAxiosPrivate();
    const [delBtnClk, setDelBtnClk] = useState(false);
    const [isDeleting, setIsDeleting] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleDelBtnClk = async() => {
        const productID = delProduct.productID;
        setDelBtnClk(true);
        try{
            const response = await axiosPrivate.delete(`${DELETE_PRODUCT_URI}/${productID}`);

            if(response?.status === 201){
                setSuccessMsg(response.data.message);
                setErrorMsg('');
                productsFetch();
            }
        } catch(err){
            if (!err?.response) {
                setErrorMsg('No server response!');
            } else {
                setErrorMsg(err.response.data.message);
            }
        } finally{
            setIsDeleting(false);
        }
    }

    return(
        <div className="w-96 border-4 bg-raisinblack border-blue-600 rounded-xl p-4">
            {!delBtnClk && <>
                            <div className="flex flex-col items-center">
                                <FontAwesomeIcon icon={faCircleExclamation} className="text-red-600 text-xl my-4"/>
                                <h2 className="py-2 font-bold">You are about to delete {delProduct.productName}</h2>
                                <p className="text-center text-sm text-slate-400">Are you sure about deleting this product from inventory? This action cannot be undone.</p>
                            </div>
                            <div className="flex mt-4 py-2 justify-evenly">
                                <button 
                                    className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                    onClick={() => setDelProduct({'productID': '', 'productName': ''})}
                                >Cancel</button>
                                <button
                                    className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-red-500 to-red-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                    onClick={() => handleDelBtnClk()}
                                >Delete</button>
                            </div>
                        </>}
            { delBtnClk && isDeleting && 
                <>
                    <div className="flex flex-col items-center">
                        <DotLoaderAnimation />
                        <h2 className="py-2 font-bold">{delProduct.productName} is being deleted</h2>
                        <p className="text-center text-sm text-slate-400">This action cannot be undone.</p>
                    </div>
                </>
            }
            {
                successMsg && 
                    <>
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-3xl" beatFade />
                            <h2 className="py-2 font-bold">{delProduct.productName} is successfully deleted</h2>
                            <p className="text-center text-sm text-slate-400">This product is successfully deleted from inventory.</p>
                        </div>
                        <div className="flex mt-4 py-2 justify-evenly">
                            <button 
                                className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                onClick={() => setDelProduct({'productID': '', 'productName': ''})}
                            >Close</button>
                        </div>
                    </>
            }
            {
                errorMsg && 
                    <>
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faCircleXmark} className="text-red-600 text-3xl" />
                            <h2 className="py-2 font-bold">Something went wrong</h2>
                            <p className="text-center text-sm text-slate-400">{errorMsg}</p>
                        </div>
                        <div className="flex mt-4 py-2 justify-evenly">
                            <button 
                                className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                                onClick={() => setDelProduct({'productID': '', 'productName': ''})}
                            >Close</button>
                        </div>
                    </>
            }
        </div>
    );
}