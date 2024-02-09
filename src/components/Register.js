import { faCheckCircle, faCube, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../API/axios";

const USERNAME_REGEX = /^[A-z][A-z0-9 ]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const USER_REGISTER_URI = '/register';

const Register = () => {
    const navigate = useNavigate();

    const usernameRef = useRef();

    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidMatch, setIsValidMatch] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [formMsg, setFormMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setIsValidUsername(USERNAME_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setIsValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setIsValidPassword(PASSWORD_REGEX.test(password));
        setIsValidMatch(confirmPassword === password);
    }, [password, confirmPassword]);

    useEffect(() => {
        setFormMsg('');
    }, [username, email, password, confirmPassword]);

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(!username?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()){
            setFormMsg("fields can't be empty");
            return;
        }
        
        if(!isValidUsername || !isValidEmail || !isValidPassword || !isValidMatch){
            setFormMsg("invalid entry");
            return;
        }

        try{
            const user = {
                username : username,
                email : email,
                password : password
            };

            const response = await axios.post(USER_REGISTER_URI,
                user,
                {
                    header : {
                        'Content-Type' : 'application/json',
                    },
                }
            );

            if(response?.status === 201){
                setSuccessMsg(response.data.message);
                setFormMsg('');
            }
            
        } catch(error){
            if (!error?.response) {
                setFormMsg('No Server Response');
            } else {
                setFormMsg(error.response.data.message);
            }
        } finally{
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        
            setTimeout(() => {
                navigate(-1);
            }, 2000); 
        }
    }

    return(
           <section className="h-full flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <FontAwesomeIcon icon={faCube} className='w-full text-5xl text-blue-600'/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Create an account
                    </h2>
                    {formMsg && <p className="text-sm text-red-400 text-center px-2 pb-2"><FontAwesomeIcon icon={faInfoCircle}/> {formMsg}</p>}
                    {successMsg && <p className="text-sm text-blue-500 text-center px-2 pb-2"><FontAwesomeIcon icon={faCheckCircle} fade/> {"  " + successMsg}</p>}
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-slate-400">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    ref={usernameRef}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setUsernameFocus(true)}
                                    onBlur={() => setUsernameFocus(false)}
                                    className="w-full h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none border-2 border-blue-600 text-slate-400"
                                />
                                {usernameFocus && username && !isValidUsername && <p className="text-sm text-red-400 px-4 py-2"><FontAwesomeIcon icon={faInfoCircle}/>  enter valid name</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-400">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
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
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-slate-400">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setConfirmPasswordFocus(true)}
                                    onBlur={() => setConfirmPasswordFocus(false)}
                                    className="w-full h-10 px-4 bg-black bg-opacity-40 rounded-lg outline-none border-2 border-blue-600 text-slate-400"
                                />
                                {confirmPasswordFocus && confirmPassword && !isValidMatch && <p className="text-sm text-red-400 px-4 py-2"><FontAwesomeIcon icon={faInfoCircle}/>  password should match</p> }
                            </div>
                        </div>

                        <div className="flex justify-evenly mt-4 py-2">
                            <button
                                type="submit"
                                className="w-24 h-9 py-2 text-sm font-semibold rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 backdrop-blur-lg hover:cursor-pointer active:opacity-90"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to='/'>
                            <span className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                                Signin 
                            </span>
                        </Link>
                    </p>
                </div>
            </section> 
    );
}

export default Register;