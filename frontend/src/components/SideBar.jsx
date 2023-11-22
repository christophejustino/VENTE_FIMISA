import React, { useEffect, useState } from "react";
import Navlink from "./Navlink";
import { useSignOut } from "react-auth-kit";
import useRoutes from "../hooks/useRoutes";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoInvertModeOutline } from "react-icons/io5";
import { MdLightMode, MdDarkMode, MdLogout } from "react-icons/md";
import { useContext } from "react";
import clsx from "clsx";
import { SideBarContext } from "../context/SideBarContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const SideBar = () => {
  const { size, toggleSize, toggleTheme, theme } = useContext(SideBarContext);
  const routes = useRoutes();

  const signOut = useSignOut();
  const navigate = useNavigate();
  const logOut = () => {
    signOut();
    navigate("/auth");
  };

  return (
    <nav
      className={clsx(
        "fixed col-[1] bg-white dark:bg-gray-900 h-screen shadow",
        size === "full" ? "w-[250px]" : "w-[80px]"
      )}
    >
      <div
        className={clsx(
          "logo w-full py-6 space-x-2  flex justify-center items-center relative",
          size === "full" ? "-ml-6" : "ml-1"
        )}
      >
        <img
          className={clsx(
            "w-10 h-10 rounded-full object-cover duration-500",
            size === "full" && "rotate-[360deg]"
          )}
          src="longo.PNG"
          alt=""
        />
        {size === "full" && (
          <h1 className=" font-extrabold text-3xl dark:text-white">FIMISA</h1>
        )}
        <div
          onClick={toggleSize}
          className={clsx(
            "w-8 h-8 dark:bg-slate-500 rounded-full cursor-pointer flex items-center justify-center bg-slate-200 shadow  absolute",
            size === "full" ? "-right-10" : "-right-3"
          )}
        >
          {size === "full" ? (
            <FaArrowLeft className="text-black" />
          ) : (
            <FaArrowRight className="text-black" />
          )}
        </div>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={clsx(
          "navlinks-groups mt-6 flex flex-col space-y-5",
          size === "full" ? "px-8" : "px-3"
        )}
      >
        {routes.map((yes) => (
          <Navlink
            path={yes.path}
            key={yes.label}
            active={yes.active}
            icone={yes.icon}
          >
            {yes.label}
          </Navlink>
        ))}
      </motion.div>
      <div className="absolute bottom-0 pb-6 space-y-4 ">
        <div
          className={clsx(
            "flex items-center pl-2.5 my-2",
            size === "mini" ? "pl-[30px] " : "pl-[36px]",
            theme === "light" ? "space-x-3" : "space-x-4"
          )}
        >
          <IoInvertModeOutline className="text-slate-500 dark:text-slate-300 text-xl" />
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
        </div>
        <div className={clsx("mx-6 hover:bg-slate-200 rounded-lg h-10 cursor-pointer bottom-0", size === "full" && "shadow")} color="bg-slate-800" onClick={logOut}>
          <div className={clsx("flex justify-center items-center py-2",size === "full" ? "mr-8 space-x-3" : "ml-2"
            )}>
            <MdLogout className="text-xl dark:text-slate-300 text-slate-500 dark:hover:text-blue-700 hover:text-blue-700"
             />
            {size === "full" && <h1 className=" font-medium text-slate-500 dark:text-slate-300 dark:hover:text-black hover:text-black">Déconnecter</h1>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;


