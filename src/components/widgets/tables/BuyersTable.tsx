import React, {
  HTMLProps,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  // Column,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  // Table,
  useReactTable,
} from "@tanstack/react-table";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline, MdEditSquare, MdRemoveRedEye } from "react-icons/md";
import classNames from "classnames";
import { IBuyers } from "@/interfaces/tables.interface";
import { buyers_data } from "@/constants/data";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const BuyersTable = () => {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState({});
  // const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([...buyers_data]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IBuyers>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "user_name",
        cell: ({ row }) => (
          <div key={row.id} className="flex gap-4 items-center ml-8">
            <Image
              src={row.original.profile_img}
              alt={row.original.username}
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-sm text-[#7C7C7C]">
              {row.original.username}
            </span>
          </div>
        ),
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-8">User Name</span>
        ),
      },
      {
        accessorKey: "email",
        cell: (info) => info.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">Email</span>,
      },
      {
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Phone Number</span>
        ),
      },
      {
        accessorKey: "created_at",

        cell: ({ cell }) => cell.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Date Created</span>
        ),
      },
      {
        accessorKey: "status",
        cell: ({ cell }) => {
          switch (cell.getValue()) {
            case "active":
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-lime-600 mr-1" />
                  <span className="text-lime-600">Active</span>
                </text>
              );
            default:
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-red-500 mr-1" />
                  <span className="text-red-500">Inactive</span>
                </text>
              );
          }
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Account Status</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start items-center">
            <button className="hover:scale-90 border-none transition duration-300">
              <MdRemoveRedEye size={24} />
            </button>
            <button className="hover:scale-90 border-none ml-3 transition duration-300">
              <MdEditSquare size={24} />
            </button>
            <button
              className="hover:scale-90 border-none ml-3 transition duration-300"
              onClick={() => {
                const newData = data.filter((_, idx) => idx !== row.index);
                setData(newData);
              }}
            >
              <MdDeleteOutline size={24} />
            </button>
          </div>
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Action</span>,
      },
    ],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="my-10 w-full">
      <ScrollArea.Root className="ScrollAreaRoot w-full h-[70vh] px-4 pb-2 bg-white rounded-xl border shadow-sm border-slate-300">
        <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
          <table className=" w-screen lg:w-full px-8 relative">
            <thead className="sticky top-0 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="text-left font-medium pt-3 text-[#7C7C7C] text-sm"
                      key={header.id}
                    >
                      {header.index > 2 && header.id !== "actions" ? (
                        <text className="flex justify-between items-center w-fit">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <span className="flex flex-col">
                            <BiChevronUp
                              onClick={header.column.getToggleSortingHandler()}
                              size={24}
                              className="relative top-2 text-slate-400"
                            />
                            <BiChevronDown
                              onClick={header.column.getToggleSortingHandler()}
                              size={24}
                              className="relative -top-2"
                            />
                          </span>
                        </text>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="my-10">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    className="px-2 odd:border-y-[1px] odd:border-slate-300"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          className="py-4 font-semibold text-left text-xs"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar p-[2px] rounded-xl mb-4 flex bg-slate-100 hover:bg-slate-200"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar p-[2px] rounded-xl mb-4 flex bg-slate-100 hover:bg-slate-200 "
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="" />
      </ScrollArea.Root>

      <div className="h-fit mt-2">
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          {table.getState().pagination.pageIndex + 1 < 3 && (
            <>
              <button
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageIndex)
                }
              >
                {table.getState().pagination.pageIndex + 1}
              </button>
              <button
                onClick={() =>
                  table.getCanNextPage() &&
                  table.setPageIndex(table.getState().pagination.pageIndex + 1)
                }
              >
                {table.getState().pagination.pageIndex + 2}
              </button>
              <button
                onClick={() =>
                  table.getState().pagination.pageIndex + 2 <
                    table.getPageCount() &&
                  table.setPageIndex(table.getState().pagination.pageIndex + 1)
                }
              >
                {table.getState().pagination.pageIndex + 3}
              </button>
            </>
          )}
          {table.getState().pagination.pageIndex > 5 && (
            <>
              <text>...</text>
              <button
                onClick={() =>
                  table.setPageIndex(table.getState().pagination.pageSize)
                }
              >
                {table.getPageCount() + 1}
              </button>
            </>
          )}
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={classNames(
        className,
        "w-4 h-4 text-slate-500 bg-white border-slate-300 rounded-md focus:ring-slate-900 dark:focus:ring-blue-900 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
      )}
      {...rest}
    />
  );
}

export default memo(BuyersTable);
