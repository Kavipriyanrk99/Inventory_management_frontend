import { Outlet } from "react-router-dom";
import Head from "./components/Head";


const Layout = () => {
    return(
        <main className="flex">
            <Head />
            <Outlet />
        </main>
    );
}

export default Layout;