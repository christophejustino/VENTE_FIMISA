import React, { useContext, useState } from "react";
import useRoutes from "../../hooks/useRoutes";
import useTitle from "../../hooks/useTitle";
import clsx from "clsx";
import { HiOutlineLogin, HiMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import UserButton from "../UserButton/UserButton";
import { SideBarContext } from "../../context/SideBarContext";
// import logo from "../../../public/logo.png";

const Navbar = () => {
  const { size } = useContext(SideBarContext);
  // const [open, setOpen] = useState(false);
  // const ShowDropDown = () => {
  //   setOpen(!open);
  // };
  const title = useTitle();
  // const [show, setShow] = useState(true);

  return (
    <div
      className={clsx(
        "fixed h-16  row-[2] md:row-[1] dark:bg-slate-800 justify-between bg-white shadow-sm md:bg-slate-50 w-full text-slate-950 dark:text-white p-6 md:p-4 flex items-center z-30"
      )}
    >
      <h1 className="text-2xl font-bold ">{title}</h1>
      {/* <div className="relative" onClick={ShowDropDown}>
        <div className="text-2xl py-2 cursor-pointer w-9 h-9 -mx-2">
          <HiMenu />
        </div>
        {open && (
          <div className="bg-white dark:bg-slate-800 border dark:border-slate-800 h-[120px] w-[150px] absolute bottom-[-125px] space-y-6 z-50 right-0 pt-[15px] pl-[15px]">
            <div
              onClick={toggleTheme}
              className="w-24 z-50 relative h-10 rounded-full bg-slate-200 dark:bg-slate-950 flex items-center space-x-2 px-3 "
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <MdLightMode className="cursor-pointer text-2xl text-amber-500 dark:text-slate-200" />
              </div>
              <div className="w-8 h-8 rounded-full   flex items-center justify-center">
                <MdDarkMode className="cursor-pointer text-2xl text-dark dark:text-slate-600" />
              </div>
              <motion.div
                initial={{ x: theme === "dark" && 0 }}
                animate={{ x: theme === "dark" ? 39 : 0 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 left-1 rounded-full flex items-center justify-center bg-slate-400 dark:bg-slate-900  absolute -z-10"
              ></motion.div>
            </div>
            <div onClick={logOut} className="text-slate-950 dark:text-white cursor-pointer font-semibold flex items-center justify-start space-x-2">
              <HiOutlineLogin />
              <h1>Deconnéxion</h1>
            </div>
          </div>
        )}
      </div> */}
      {/* <div className="md:hidden w-14 h-14 flex items-center justify-center">
        <img src={logo} alt="" />
      </div> */}
      <div
        className={clsx(
          " md:flex hidden items-center justify-center mt-1  ",
          size === "full" ? "md:pr-[248px]" : "pr-[68px]"
        )}
      >
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
