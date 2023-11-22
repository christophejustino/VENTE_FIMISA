import React from "react";
import Navbar from "../components/Navbars/Navbar";
import SubNavbar from "../components/Navbars/SubNavbar";
import { Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";

const BodyContentLayout = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <Navbar />
      {!["/", "/service"].includes(pathname) && <SubNavbar />}
      <div className={clsx(" dark:text-slate-50", ["/", "/service"].includes(pathname) ? "row-[2]" : "row-[3]")}>
        <Outlet />
      </div>
    </>
  );
};

export default BodyContentLayout;
