export const SquareSpinnerAnimation = () => {
    return(
        <div className="h-[550px] flex flex-col justify-center items-center">
            <div className="rounded-md h-16 w-16 border-4 border-t-4 border-blue-500 animate-spin"></div>
            <p className="p-8 font-semibold text-slate-400">Getting things ready for you...</p>
        </div>
    );
}

export const DotLoaderAnimation = () => {
    return(
        <div className='flex items-center py-3.5'>
            <span className='sr-only'>Loading...</span>
            <div className='h-2 w-2 mr-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-2 w-2 mr-1 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
        </div>      
    );
}
