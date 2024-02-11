import axios from "axios";

const BASE_URI = 'http://127.0.0.1:3500';

export default axios.create({
    baseURL: BASE_URI 
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URI,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});