import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ServerMsgHeader = ({ type, title, body }) => {
    return(
        <div className="flex flex-col items-center">
            <FontAwesomeIcon 
                icon={type === 'success' ? faCircleCheck : faCircleXmark} 
                className={ type === 'success' ? "text-green-500 text-3xl" : "text-red-600 text-3xl"} 
                beatFade 
            />
            <h2 className="py-2 font-bold">{title}</h2>
            <p className="text-center text-sm text-slate-400">{body}</p>
        </div>
    );
}

export default ServerMsgHeader;