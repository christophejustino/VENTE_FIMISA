import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'


const Button = ({children, type, color, width, styles, disable, onClick, icon:Icon}) => {
  const handelClick = () => {
    if(onClick) onClick();
    else return;
  };
  return (
    <motion.button type={type} onClick={handelClick} whileHover = {{ scale: 1.1}} className={clsx(`py-2 px-5 rounded-lg h-10 text-white font-medium `, color, width, styles,
    disable && "pointer-events-none cursor-not-allowed"
    )}>
        {children} {Icon && <Icon />}
    </motion.button>
  )
}

export default Button