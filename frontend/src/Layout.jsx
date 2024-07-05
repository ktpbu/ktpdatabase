import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Layout element is the template for all other page: each has the header, then the Outlet (actual page rendered)
function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header className="bg-red-200" />
            <div className="grow">
                <Outlet />
            </div>
            <Footer className="w-full bg-green-200" />
        </div>
    );
}

export default Layout;
