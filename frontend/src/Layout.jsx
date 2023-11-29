import { Outlet } from "react-router-dom";

import Header from "../../frontend/src/components/header/Header";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
