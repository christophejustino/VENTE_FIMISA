import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoInvertModeOutline } from "react-icons/io5";
import { MdLightMode, MdDarkMode, MdLogout } from "react-icons/md";
import Navlink from "../Navlink/Navlink";
import useRoutes from "../../hooks/useRoutes";
import { motion } from "framer-motion";
import { useContext } from "react";
import clsx from "clsx";
import { SideBarContext } from "../../context/SideBarContext";
import logo from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import UserButton from "../UserButton/UserButton";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const Sidebar = () => {
  const { size, toggleSize } = useContext(SideBarContext);
  const routes = useRoutes();
 

  return (
    <nav
      className={clsx(
        "md:bg-white bg-white dark:shadow-sm h-14 md:h-screen dark:text-white dark:bg-slate-950 fixed row-[1] md:row-[1] md:shadow-none shadow z-50 duration-300 ease-in-out",
        size === "full" ? "w-full md:w-[250px]" : "w-full md:w-[70px]"
      )}
    >
      <div className="flex justify-center items-center space-x-4 md:mt-11 relative">
        <img
          src={logo}
          alt=""
          className={clsx(
            " rounded-xl object-cover duration-500 hidden md:block",
            size === "full" ? "rotate-[360deg] h-10" : "h-10"
          )}
        />
        {size === "full" && (
          <h1 className="text-3xl font-bold hidden md:block">FIMISA</h1>
        )}
        <div
          onClick={toggleSize}
          className="w-8 h-8 rounded-full bg-slate-100 absolute flex  dark:bg-slate-800 items-center justify-center md:-right-4 -right-8 z-[500]"
        >
          {size === "full" ? (
            <FaArrowLeft className="text-black dark:text-white" />
          ) : (
            <FaArrowRight className="text-black dark:text-white " />
          )}
        </div>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={clsx(
          " md:mt-8 flex md:flex-col space-x-3 md:items-stretch items-center justify-between md:justify-start h-full md:space-x-0 md:space-y-2",
          size === "full" ? "md:px-4 px-3" : "px-2.5"
        )}
      >
        {routes.map((route) => (
          <Navlink
            key={route.label}
            label={route.label}
            icon={route.icon}
            active={route.active}
            path={route.path}
          />
        ))}
        <div className="md:hidden mt-1">
          <UserButton />
        </div>
      </motion.div>
      {/* <div
        className={clsx(
          "mx-6 hover:bg-slate-100 rounded-lg h-10 absolute cursor-pointer bottom-14"
        )}
        color="bg-slate-800"
        onClick={logOut}
      >
        <div
          className={clsx(
            "flex justify-center items-center py-2",
            size === "full" ? "mr-8 px-1 space-x-4" : "ml-1"
          )}
        >
          <MdLogout className="text-xl dark:text-slate-300 text-slate-500  dark:hover:text-blue-700 hover:text-blue-700" />
          {size === "full" && (
            <h1 className=" font-bold text-slate-500 dark:text-slate-300 dark:hover:text-black hover:text-black">
              Déconnecter
            </h1>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 pb-1 space-y-4 hidden md:block">
        <div
          className={clsx(
            "flex items-center justify-end pl-2 my-2",
            size === "mini" ? "pl-[24px] h-10" : "pl-[24px] h-10",
            theme === "light" ? "space-x-3" : "space-x-4"
          )}
        >
          <IoInvertModeOutline className="hidden md:block text-slate-500 dark:text-slate-300 text-xl" />
          {size === "full" && (
            <>
              {theme === "light" ? (
                <span className="text-slate-500 dark:text-slate-300 font-medium">
                  Lumière
                </span>
              ) : (
                <span className="text-slate-500 dark:text-slate-300 font-medium">
                  Sombre
                </span>
              )}
              <div
                onClick={toggleTheme}
                className="w-24 z-20 relative h-10 rounded-full bg-slate-200 dark:bg-slate-950 flex items-center space-x-2 px-3 "
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
            </>
          )}
        </div> */}
      {/* </div> */}
    </nav>
  );
};

export default Sidebar;
