import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

export const UnitsMetricsCard = ({ stockUnits }) => {
    return(
        <article className="min-w-56 min-h-36 my-2 p-4 bg-raisinblack rounded-xl relative">
            <FontAwesomeIcon 
                icon={faBoxOpen} 
                className='text-3xl px-2 py-2.5 rounded-lg bg-gradient-to-b from-orange-400 to-orange-500 backdrop-blur-lg' 
            />
            <h3 className="text-2xl font-bold pt-1">
                {stockUnits}
            </h3>
            <p className="text-slate-400">
                Stock Units
            </p>
            <div className="absolute top-0 right-0 h-36 w-2 bg-gradient-to-b from-orange-400 to-orange-500 backdrop-blur-lg border-e-1 rounded-e-md"></div>
        </article>
    );
}

export const PriceMetricsCard = ({ stockWorth }) => {
    return(
        <article className="min-w-56 min-h-36 my-2 p-4 bg-raisinblack rounded-xl relative">
            <FontAwesomeIcon 
                icon={faIndianRupeeSign} 
                className='text-3xl px-4 py-2.5 rounded-lg bg-gradient-to-b from-green-400 to-green-500 backdrop-blur-lg' 
            />
            <h3 className="text-2xl font-bold pt-1">
                {stockWorth}
            </h3>
            <p className="text-slate-400">
                Stock Worth
            </p>
            <div className="absolute top-0 right-0 h-36 w-2 bg-gradient-to-b from-green-400 to-green-500 backdrop-blur-lg border-e-1 rounded-e-md"></div>
        </article>
    );
}