import React from "react";
import clsx from "clsx";
import {FcSoundRecordingCopyright} from 'react-icons/fc'

const Cards = ({ tittle, data, label }) => {
  return (
    <div className="relative px-6 py-4 h-26  rounded-lg dark:bg-slate-800 bg-white shadow-lg">
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center justify-start space-x-2">
          <FcSoundRecordingCopyright className="text-5xl" />
          <p className="text-xl font-bold dark:text-slate-50 text-black">{label}</p>
        </div>
        <p className="text-base font-bold">{tittle}</p>
        <div className="bg-slate-200 flex items-center dark:bg-black justify-center rounded-full w-10 h-10">
          <p className="text-xl font-bold">{data}</p>
        </div>
      </div>
      <div
        className={clsx(
          `absolute right-3 -mt-11 w-8 rounded-lg h-8 flex items-center justify-center`
        )}
      ></div>
    </div>
  );
};

export default Cards;
