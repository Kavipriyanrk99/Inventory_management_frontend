import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const AddForm = () => {
    return(
        <form className="w-96 p-4 bg-raisinblack border-2 border-blue-600 rounded-xl flex flex-col relative">
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-4 right-4 text-xl text-red-500 cursor-pointer active:opacity-90"/>
            <h2 className="text-xl font-bold py-4 pl-2">New Product</h2>
            <div className="flex flex-col gap-4 px-2">
                <div className="w-full h-fit flex flex-col gap-1.5">
                    <label className="text-sm text-slate-400">Product Name</label>
                    <input
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                    ></input>
                </div>
                <div className="w-full h-fit flex flex-col gap-1.5" >
                    <label className="text-sm text-slate-400">Barcode</label>
                    <input 
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                    ></input>
                </div>
                <div className="w-full h-fit flex flex-col gap-1.5" >
                    <label className="text-sm text-slate-400">Unit Price</label>
                    <input 
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                    ></input>
                </div>
                <div className="w-full h-fit flex flex-col gap-1.5" >
                    <label className="text-sm text-slate-400">Description</label>
                    <textarea 
                        className="w-auto h-10 pl-4 bg-black bg-opacity-40 rounded-lg outline-none focus:border-2 focus:bg-transparent border-blue-600 text-slate-300"
                    ></textarea>
                </div>
            </div>
            <div className="flex justify-evenly mt-4 py-2">
                <button
                    className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                >Add</button>
                <button 
                    className="w-24 h-9 py-2 text-sm font-semibold rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                >Clear</button>
            </div>
        </form>
    );
}

export default AddForm;