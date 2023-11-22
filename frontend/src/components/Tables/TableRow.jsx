import React from "react";
import clsx from "clsx";

const TableRow = ({children, col}) => {
  return (
    <div
      className={clsx(
        "w-full grid grid-cols-1 md:grid-cols-3 p-2 dark:bg-slate-950 dark:text-slate-50 even:bg-white last:border-b-0 bg-slate-100 text-slate-950 border-b border-b-slate-400",
        col ? col : "grid-cols-1"
      )}
    >
      {children}
    </div>
  );
};

export default TableRow;
