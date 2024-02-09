import { faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Login = () => {
    return(
           <div className="h-full flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <FontAwesomeIcon icon={faCube} className='w-full text-5xl text-blue-600'/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-400">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none border-2 border-blue-600 text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-400">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to='/'>
                                        <span href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                                            Forgot password?
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none border-2 border-blue-600 text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="flex justify-evenly mt-4 py-2">
                            <button
                                type="submit"
                                className="w-24 h-9 py-2 text-sm font-semibold rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-slate-400">
                        Don't have an account yet?{' '}
                        <Link to='/register'>
                            <span className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                                Signup
                            </span>
                        </Link>
                    </p>
                </div>
            </div> 
    );
}

export default Login;
