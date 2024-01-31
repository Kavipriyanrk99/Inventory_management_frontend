import { DotLoaderAnimation } from "./IsLoadingAnimation";

const ProcessingIndicator = ({ title, body }) => {
    return(
        <div className="w-96 border-4 bg-raisinblack border-blue-600 rounded-xl p-4">
            <div className="flex flex-col items-center">
                <DotLoaderAnimation />
                <h2 className="py-2 font-bold">{title}</h2>
                <p className="text-center text-sm text-slate-400">{body}</p>
            </div>   
        </div>
    );
}

export default ProcessingIndicator;