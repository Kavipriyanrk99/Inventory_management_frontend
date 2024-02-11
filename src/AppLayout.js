import { Navigate, Outlet } from "react-router-dom";
import Head from "./components/Head";
import useAuth from "./hooks/useAuth";

const AppLayout = ({ allowedRoles }) => {
    const { auth } = useAuth();

    return(
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <div className="flex">
                <Head />
                <Outlet />
              </div> 
            : auth?.email 
                ? <Navigate to={'/unauthorized'} replace/> 
                : <Navigate to={'/'} replace/>

    );
}

export default AppLayout;