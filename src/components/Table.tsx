import React from 'react';
import { twMerge } from 'tailwind-merge';

// Table Container
export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ className, children, ...props }) => (
  <div className="w-full overflow-x-auto border border-braun-200 bg-white">
    <table className={twMerge("w-full text-left border-collapse", className)} {...props}>
      {children}
    </table>
  </div>
);

// Table Header Wrapper
export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...props }) => (
  <thead className={twMerge("bg-braun-50 border-b border-braun-200", className)} {...props}>
    {children}
  </thead>
);

// Table Body Wrapper
export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...props }) => (
  <tbody className={twMerge("divide-y divide-braun-100", className)} {...props}>
    {children}
  </tbody>
);

// Table Row
export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, children, ...props }) => (
  <tr className={twMerge("hover:bg-braun-50/50 transition-colors group", className)} {...props}>
    {children}
  </tr>
);

// Header Cell
export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <th 
    className={twMerge(
      "px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-braun-500 font-normal whitespace-nowrap",
      className
    )} 
    {...props}
  >
    {children}
  </th>
);

// Data Cell
export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <td 
    className={twMerge(
      "px-6 py-4 text-xs text-braun-700 font-sans whitespace-nowrap",
      className
    )} 
    {...props}
  >
    {children}
  </td>
);