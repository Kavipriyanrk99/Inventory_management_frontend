import User from "./User";

const Inbound = () => {
    return(
        <section className="w-full py-4">
            <article className="flex justify-between">
                <h1 className="min-w-56 px-3 py-1.5 m-2 text-3xl font-bold">
                    Inbound
                </h1>
                <div className="flex">
                    <User
                        username={'Kavipriyan'} 
                    />
                </div>
            </article>
            <section className="w-full p-5 flex justify-center">
                     <form className="w-2/5 p-4 bg-raisinblack border-4 border-blue-600 rounded-xl flex flex-col relative">
                        <h2 className="text-xl font-bold py-4 pl-2">Add Product</h2>
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
                                ></input>
                            </div>
                            <div className="w-full h-44 bg-black bg-opacity-40 rounded-lg">
                                
                            </div>
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
                                ></input>
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
                                ></textarea>
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
            </section>
        </section>
    );
}

export default Inbound;