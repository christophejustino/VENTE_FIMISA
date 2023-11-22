import clsx from "clsx";
import React from "react";

const Input = ({ label, type, state, error , onChange}) => {
  const func = () => {
    if(onChange){
      onChange()
      return
    }
    
  }
  return (
    <div class="sm:col-span-3">
      <label
        htmlFor={label}
        className="block text-sm  leading-6 text-gray-900 dark:text-white"
      >
       {label} 
      </label>
      <div>
        <input
        onChange={onChange}
          type={type}
          {...state}
          className={clsx("block w-full rounded-md border-0 py-1.5 dark:text-white dark:bg-slate-800 text-gray-900 shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          error && "ring-red-500 focus:ring-red-600 dark:ring-red-500 dark:focus:ring-red-600")
          }

        />
      </div>
    </div>
  );
};

export default Input;
