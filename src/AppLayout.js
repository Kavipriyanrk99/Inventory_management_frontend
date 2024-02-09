import { Outlet } from "react-router-dom";
import Head from "./components/Head";


const AppLayout = () => {
    return(
        <main className="flex">
            <Head />
            <Outlet />
        </main>
    );
}

export default AppLayout;