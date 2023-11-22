import React from "react";
import useSubRoutes from "../../hooks/useSubRoutes";
import SubNavlink from "../Navlink/SubNavlink";
import { useLocation } from "react-router-dom";


const SubNavbar = () => {
  const pathname = useLocation().pathname.split("/")[1]
  const subRoutes = useSubRoutes();
  return (
    <div className="row-[2] px-4 h-full dark:bg-slate-700 bg-slate-50 md:bg-white flex items-center space-x-3 overflow-x-auto">
      {subRoutes.map((subRoutes) => (
        subRoutes.page === pathname &&
        <SubNavlink
          key={subRoutes.label}
          path={subRoutes.path}
          label={subRoutes.label}
          active={subRoutes.active}
        />
      ))}
    </div>
  );
};

export default SubNavbar;
