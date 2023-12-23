import { Outlet } from "react-router-dom";

import Header from "../../frontend/src/components/header/Header";

// Layout element is the template for all other page: each has the header, then the Outlet (actual page rendered)
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
