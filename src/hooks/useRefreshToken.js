import axios from "../API/axios";
import useAuth from "./useAuth";

const REFRESH_TOKEN_URI = "/refresh";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get(REFRESH_TOKEN_URI, {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh; 
}

export default useRefreshToken;