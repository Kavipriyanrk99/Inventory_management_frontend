import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Unauthorized = () => {
    return(
        <section>
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                    <p className="px-3 pt-3 pb-2 text-sm font-medium text-red-500 rounded-full bg-gray-800">
                        <FontAwesomeIcon icon={faXmarkCircle} className="w-6 h-6"/>
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Unauthorized</h1>
                    <p className="mt-4 text-gray-400">You are not authorized to access. Click below to logout:</p>

                    <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                        <button className="w-1/2 px-5 py-2 text-sm font-semibold tracking-wide text-white rounded-lg shrink-0 sm:w-auto bg-gradient-to-b from-blue-500 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90">
                            Logout 
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Unauthorized;