import React from "react";
import clsx from 'clsx'

const Card = ({icon:Icon,tittle, data, color }) => {
  return (
    <div className="relative px-6 py-4 h-20 rounded-lg dark:bg-slate-800 bg-white shadow-lg">
      <div className="flex flex-col items-start justify-center">
        <p className="text-base font-bold">{tittle}</p>
        <p className="text-xl font-bold">{data}</p>
      </div>
      <div className={clsx(`absolute right-3 -mt-11 w-8 rounded-lg h-8 flex items-center justify-center`, color)}>
        <Icon className="text-xl" />
      </div>
    </div>
  );
};

export default Card;
