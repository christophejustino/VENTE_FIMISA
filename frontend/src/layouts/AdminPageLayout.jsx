import React, { useContext } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { SideBarContext } from "../context/SideBarContext";
import clsx from "clsx";

const AdminPageLayout = () => {
  const { size } = useContext(SideBarContext);
  const pathname = useLocation().pathname;
  return (
    <div
      className={clsx(
        "grid duration-300 ease-in-out",
        size === "full"
          ? "grid-rows-[55px,1fr] md:grid-rows-none md:grid-cols-[250px,1fr]"
          : "grid-cols-[70px,1fr] md:grid-rows-[55px,1fr]"
      )}
    >
      <Sidebar />
      <div
        className={clsx(
          "row-[2] md:row-[1] md:col-[2] grid",
          ["/", "/service"].includes(pathname)
            ? "grid-rows-[64px,1fr]"
            : "grid-rows-[64px,50px,1fr]"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPageLayout;
