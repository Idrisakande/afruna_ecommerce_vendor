import { orderData } from "@/constants/data";
import { IOrder } from "@/interfaces/tables.interface";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { FC, HTMLProps, useEffect, useMemo, useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import Link from "next/link";

interface OrderTableProps {}

export const OrderTable: FC<OrderTableProps> = ({}) => {
  const [rowSelection, setRowSelection] = useState({});
  // const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([...orderData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IOrder>[]>(
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
        accessorKey: "id",
        cell: (info) => {
          const id = `#${info.getValue()}`;
          return <div className="ml-2">{id}</div>;
        },
        header: () => <span className="text-sm ml-2 text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "buyers_name",
        cell: (info) => {
          const buyersName = `${info.getValue()}`;
          return <div className="ml-2">{buyersName}</div>;
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C] ml-2">Buyers Name</span>
        ),
      },
      {
        accessorKey: "item_name",
        cell: (info) => {
          const itemName = `${info.getValue()}`;
          return <div className="ml-2">{itemName}</div>;
        },
        header: () => (
          <span className="text-sm ml-2 text-[#7C7C7C]">Item Name</span>
        ),
      },
      {
        accessorKey: "amount",
        cell: (info) => `$${info.getValue()}`,
        header: () => <span className="text-sm text-[#7C7C7C]">Amount</span>,
      },
      {
        accessorKey: "order_date",

        cell: ({ cell }) => cell.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Order Date</span>
        ),
      },
      {
        accessorKey: "delivery_date",

        cell: ({ cell }) => cell.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Delivery Date</span>
        ),
      },
      {
        accessorKey: "method_of_payment",

        cell: ({ cell }) => {
          const payment = cell.getValue();
          return payment;
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Method of Payment</span>
        ),
      },
      {
        accessorKey: "delivery_status",
        cell: ({ cell }) => {
          switch (cell.getValue()) {
            case "Pending":
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#FFC103] mr-1" />
                  <span className="text-[#FFC103]">Pending</span>
                </text>
              );
            case "Shipped":
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#0D61FF] mr-1" />
                  <span className="text-[#0D61FF]">Shipped</span>
                </text>
              );
            case "Delivered":
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#4D9A00] mr-1" />
                  <span className="text-[#4D9A00]">Delivered</span>
                </text>
              );
            case "Pickup":
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#545ED7] mr-1" />
                  <span className="text-[#545ED7]">Pickup</span>
                </text>
              );
            case "Canceled":
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#E93627] mr-1" />
                  <span className="text-[#E93627]">Cancelled</span>
                </text>
              );
            default:
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#00C9FF] mr-1" />
                  <span className="text-[#00C9FF]">Returnedvered</span>
                </text>
              );
          }
        },
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Delivery Status</span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-between items-center">
            <Link
              href={"/orders/details"}
              className="hover:scale-90 border-none transition duration-300"
            >
              <MdRemoveRedEye size={24} />
            </Link>
            <button
              className="hover:scale-90 border-none transition duration-300"
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
      <ScrollArea.Root className="ScrollAreaRoot w-full h-[70vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
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

// export default memo(OrderTable);
