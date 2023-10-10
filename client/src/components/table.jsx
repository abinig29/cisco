import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";

const BasicTable = ({ data, columns, filterKey }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleFilterChange = (e) => {
    table.getColumn(filterKey)?.setFilterValue(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={table.getColumn(filterKey)?.getFilterValue() ?? ""}
        onChange={handleFilterChange}
        className="border mb-4 mx-10 text-sm rounded-lg  block w-[200px] p-2.5 bg-gray-700 border-gray-600 text-white "
        placeholder={`Filter with ${filterKey}`}
      />
      <table className="w-full  ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-2 bg-[#312964] text-gray-500   cursor-pointer"
                >
                  {!header.isPlaceholder && (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.isSortedDesc ? (
                          <MdOutlineArrowDownward />
                        ) : (
                          <MdOutlineArrowUpward className="inline mb-1 ml-1 text-white" />
                        )
                      ) : null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-4 pl-14 border-b border-gray-700 text-sm text-left text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end gap-4 mx-4 mb-4">
        <button
          onClick={() => table.setPageIndex(0)}
          className="border border-gray-700 text-white px-3 rounded py-2 outline-none  hover:scale-[1.05] active:scale-[1.03]"
        >
          First page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="border border-gray-700 text-white px-3 rounded py-2 disabled:text-gray-500 disabled:hover:scale-100 disabled:cursor-no-drop outline-none  hover:scale-[1.05] active:scale-[1.03]"
        >
          Previous page
        </button>

        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="border border-gray-700 text-white px-3 rounded py-2 disabled:text-gray-500 disabled:hover:scale-100 disabled:cursor-no-drop outline-none  hover:scale-[1.05] active:scale-[1.03]"
        >
          Next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="border border-gray-700 text-white px-3 rounded py-2 outline-none  hover:scale-[1.05] active:scale-[1.03]"
        >
          Last page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
