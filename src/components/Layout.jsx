import React from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <div className="layout-dashboard">
        <Sidebar />
        <div className="layout-dashboard-content">{children}</div>
      </div>
    </>
  );
}

export default Layout;