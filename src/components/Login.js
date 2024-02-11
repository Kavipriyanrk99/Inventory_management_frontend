import { faCube, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../utils/USER_VALIDATION_REGEX";
import axios from "../API/axios";
import useAuth from "../hooks/useAuth";

const USER_AUTH_URI = '/auth';

const Login = () => {
    const emailRef = useRef();
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    
    const [formMsg, setFormMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setIsValidEmail(EMAIL_REGEX.test(email)); 
    }, [email]);

    useEffect(() => {
        setIsValidPassword(PASSWORD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        setFormMsg('');
    }, [email, password]);

    const handleSubmit = async(event) => {
        event.preventDefault(); 
        if(!email?.trim() || !password?.trim()){
            setFormMsg("fields can't be empty");
            return; 
        }

        if(!isValidEmail || !isValidPassword){
            setFormMsg("invalid entry");
            return;
        }

        try{
            const userCredentials = {
                email : email,
                password : password 
            };

            const response = await axios.post(USER_AUTH_URI, 
                userCredentials, 
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    withCredentials : true
                }
            );

            if(response?.status === 200){
                setSuccess(true);
                setFormMsg('');
                console.log(response.data);

                const accessToken = response.data?.accessToken;
                const roles = response.data?.roles;

                setAuth({
                    email : email,
                    password : password,
                    roles : roles,
                    accessToken : accessToken
                });

                navigate('/app', { replace : true });
            }
        } catch(error){
            if (!error?.response) {
                setFormMsg('No Server Response');
            } else if(error.status === 400 || error.status === 401) {
                setFormMsg(error.response.data.message);
            } else{
                setFormMsg('login failed');
            }
        } finally{
            setEmail('');
            setPassword(''); 
        }
    }

    return(
           <section className="h-full flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <FontAwesomeIcon icon={faCube} className='w-full text-5xl text-blue-600'/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h2>
                    {formMsg && <p className="text-sm text-red-400 text-center px-2 pb-2"><FontAwesomeIcon icon={faInfoCircle}/> {formMsg}</p>}
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-400">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    ref={emailRef}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    className="w-full h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none border-2 border-blue-600 text-slate-400"
                                />
                                {emailFocus && email && !isValidEmail && <p className="text-sm text-red-400 px-4 py-2"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid email</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-400">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to='/'>
                                        <span className="font-semibold text-blue-600 hover:text-blue-500">
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    className="w-full h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none border-2 border-blue-600 text-slate-400"
                                />
                                {passwordFocus && password && !isValidPassword && <p className="text-sm text-red-400 px-4 py-2"><FontAwesomeIcon icon={faInfoCircle}/> password should be 8 to 24 characters, must include uppercase and lowercase letters, a number and a special character {`(!@#$%)`}</p>}
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
            </section> 
    );
}

export default Login;
