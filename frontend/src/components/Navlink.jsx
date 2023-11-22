import clsx from 'clsx';
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { SideBarContext } from '../context/SideBarContext';
import { motion, AnimatePresence } from 'framer-motion';

const Item = {
  hidden: {y:20, opacity: 0},
  visible:{
    y: 0,
    opacity: 1,
  },
};


const Navlink = ({children, icone:Icone, active, path}) => {
  const {size} = useContext(SideBarContext)
  return (
    <motion.div variants={Item}>
      <Link to={path}>
        <div className={clsx('relative navlink w-full flex  items-center',
        active ? "text-black font-medium " : "text-slate-500 font-medium dark:text-slate-300" ,
        size === "full" ? "space-x-5" : "space-x-0 ml-5 pl-0"
        )}>
              <Icone className={clsx('text-xl', active ? "text-blue-500" : "text-slate-500 dark:text-slate-300")}/>
              {size === "full" && <span >{children}</span>}
              <AnimatePresence>
                { active && <motion.div
                  initial={{width: "0%"}}
                  animate={{width: "100%"}}
                  transition={{duration: 0.5, ease: "easeInOut"}}
                  exit={{width: "0%"}}
                className={clsx('absolute w-full p-2 rounded-lg bg-gray-200  -z-10  py-5',
                size === "full" ? "-left-8" : "ml-5 -left-5"
                )}>
                  
                </motion.div>
                }
              </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  )
}

export default Navlink;