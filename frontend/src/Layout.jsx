import { Outlet } from "react-router-dom";

import Header from "../../frontend/src/components/header/Header";
import Footer from "./components/footer/Footer";

// Layout element is the template for all other page: each has the header, then the Outlet (actual page rendered)
function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
