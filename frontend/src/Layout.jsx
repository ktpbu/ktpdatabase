import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Layout element is the template for all other page: each has the header, then the Outlet (actual page rendered)
function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="grow bg-gradient-to-b from-[#8bb9ff] to-[#ffffff]">
                <Outlet />
            </div>
            <Footer className="w-full" />
            <Analytics />
        </div>
    );
}

export default Layout;
