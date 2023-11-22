import React from "react";
import { motion } from "framer-motion";

const Message = ({ icon:Icon, message }) => {
  return (
    <motion.div
      initial={{ translateX: -100 }}
      animate={{ translateX: 0 }}
      exit={{ translateX: 500 }}
      transition={{ duration: 0.1}}
      className="success-result h-60 sm:mt-0 py-8 sm:h-80 flex items-center sm:items-center sm:justify-center sm:w-[500px] flex-col"
    >
     <Icon className="sm:text-[150px] text-[100px]"/>
      <h1 className="text-xl font-semibold mt-2 dark:text-white">{message}</h1>
    </motion.div>
  );
};

export default Message;
