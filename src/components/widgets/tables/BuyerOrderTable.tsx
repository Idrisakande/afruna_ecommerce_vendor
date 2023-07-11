import { BuyerOrderData } from "@/constants/data";
import { IBuyerOrder } from "@/interfaces/tables.interface";
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
import Image from "next/image";

interface BuyerOrderTableProps {}

export const BuyerOrderTable: FC<BuyerOrderTableProps> = ({}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([...BuyerOrderData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IBuyerOrder>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => {
          const id = `#${info.getValue()}`;
          return <div className="ml-2">{id}</div>;
        },
        header: () => <span className="text-sm ml-2 text-[#7C7C7C]">ID</span>,
      },
      {
        accessorKey: "img",
        cell: ({ cell }) => (
          <Image
            src={cell.getValue() as unknown as string}
            width={45}
            height={45}
            alt="item Image"
            className="rounded-md w-[45px] h-[45px] object-fill shadow-sm"
          />
        ),
        header: () => <span className="text-sm text-[#7C7C7C]">Image</span>,
      },
      {
        accessorKey: "itemName",
        cell: (info) => {
          const itemName = `${info.getValue()}`;
          return <div className="ml-2">{itemName}</div>;
        },
        header: () => (
          <span className="text-sm ml-2 text-[#7C7C7C]">Item Name</span>
        ),
      },
      {
        accessorKey: "quantity",

        cell: ({ cell }) => cell.getValue(),
        header: () => <span className="text-sm text-[#7C7C7C]">Quantity</span>,
      },
      {
        accessorKey: "orderDate",

        cell: ({ cell }) => cell.getValue(),
        header: () => (
          <span className="text-sm text-[#7C7C7C]">Order Date</span>
        ),
      },
      {
        accessorKey: "status",
        cell: ({ cell }) => {
          switch (cell.getValue()) {
            case "Pending":
              return (
                <text className="flex justify-between items-center w-fit">
                  <span className="p-1 rounded-full bg-[#FFC103] mr-1" />
                  <span className="text-[#FFC103]">Pending</span>
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
                  <span className="p-1 rounded-full bg-[#4D9A00] mr-1" />
                  <span className="text-[#4D9A00]">Paid</span>
                </text>
              );
          }
        },
        header: () => <span className="text-sm text-[#7C7C7C]">Status</span>,
      },
      {
        accessorKey: "amount",
        cell: (info) => `$${info.getValue()}`,
        header: () => <span className="text-sm text-[#7C7C7C]">Amount</span>,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-start gap-3 items-center">
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
    <div className="w-screen lg:w-full relative">
      <table className="w-screen lg:w-full px-8 relative">
        <thead className="sticky top-[4.45rem] left-0 right-0 bg-white">
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
    </div>
  );
};
