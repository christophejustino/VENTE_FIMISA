import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const SubNavlink = ({path, label, active}) => {
  return (
    <Link className="h-full flex-shrink-0" to={path}>
      <div className="relative h-full flex items-center ">
        <span className={clsx( active ? "text-black dark:text-purple-500" : "text-slate-500 dark:text-slate-100")}>{label}</span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: active ? "100%" : 0 }}
          transition={{ duration: 0.5 }}
          exit={{ width: 0 }}
          className="w-full bg-slate-500 h-1 dark:bg-purple-500 absolute bottom-0"
        ></motion.div>
      </div>
    </Link>
  );
};

export default SubNavlink;
