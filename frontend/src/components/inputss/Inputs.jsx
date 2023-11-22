import React from "react";

const Input = ({  type, icon:Icon }) => {
  return (
    <div class="sm:col-span-3">
      
      <div>
        <Icon className="absolute text-gray-400 h-5 w-5" aria-hidden="true" />
        <input
          type={type}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

        />
      </div>
    </div>
  );
};

export default Input;
