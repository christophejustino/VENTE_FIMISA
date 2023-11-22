import clsx from "clsx";
import React from "react";

const TableHeader = ({ children, col }) => {
  return (
    <div
      className={clsx(
        "w-full grid grid-cols-1 md:grid-cols-3 dark:bg-purple-900 p-2 bg-slate-100 text-slate-950",
        col ? col : "grid-cols-1"
      )}
    >
      {children}
    </div>
  );
};

export default TableHeader;
