import clsx from "clsx";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SideBarContext } from "../../context/SideBarContext";

const Item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Navlink = ({ label, icon: Icon, active, path }) => {
  const { size } = useContext(SideBarContext);
  return (
    <motion.div variants={Item}>
      <Link to={path}>
        <AnimatePresence>
          <motion.div
            className={clsx(
              "p-2 flex justify-start relative w-full items-center rounded space-x-4",
              active ? " text-slate-950 font-semibold dark:text-slate-950" : "bg-transparent text-slate-600 dark:text-slate-300",
              size === "mini" && "justify-center"
            )}
          >
            <Icon
              className={clsx(
                "text-slate-600 text-2xl md:text-xl",
                active ? "text-blue-600 md:text-blue-700 dark:text-black" : "text-slate-600 dark:text-slate-50"
              )}
            />
            {size === "full" && (
              <span className="hidden md:inline-block">{label}</span>
            )}
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  exit={{ width: "0%" }}
                  className={clsx(
                    "absolute w-full   rounded-lg bg-slate-100 dark:bg-purple-600 -z-10  py-5",
                    size === "full" ? "md:-left-6 -left-4" : "ml-5 -left-4"
                  )}
                ></motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

export default Navlink;
