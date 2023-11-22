import clsx from "clsx";
import React from "react";

const Input = ({ label, type, state, error }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-base font-medium ">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          {...state}
          className={clsx(
            " w-full md:w-[500px] h-10 block rounded-md text-base font-medium dark:text-white bg-transparent dark:bg-slate-800 focus:ring-blue-500",
            error && "border-rose-500 focus:ring-rose-500 dark:focus:border-red-600 focus:border-rose-500"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
