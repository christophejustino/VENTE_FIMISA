import React from 'react'
import clsx from 'clsx'


const Input = ({ label, name, state, type, id, errors, disable }) => {
  // console.log(error)
  return (
    <div className='sm:col-span-3'>
        <label 
        htmlFor={ label } 
        className='block text-sm font-semibold dark:text-black  leading-6 text-gray-900'>
            {label}
        </label>
        <div className='mt-2' >
          <input 
          type={type}
          id={id}
          {...state}
          name={name}
          autoComplete='given-name'
          className={clsx('block w-full rounded-md border-0  focus:ring-blue-600 py-1.5 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 text-gray-900 sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset',
          errors && "ring-rose-500 border-rose-500 focus:ring-red-400 focus:border-red-400",
          disable && "pointer-events-none cursor-none bg-gray-300 text-gray-500"
          )}
          />
        </div>
    </div>
  );
};

export default Input;