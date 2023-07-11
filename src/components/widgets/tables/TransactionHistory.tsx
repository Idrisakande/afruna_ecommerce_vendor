import { FC, memo, useMemo, useState } from "react";

import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { ITransactionHistory } from "@/interfaces/tables.interface";
import { transactionHistory_data } from "@/constants/data";

interface TransactionHistoryType {}

const TransactionHistory: FC<TransactionHistoryType> = () => {
	const [data, setData] = useState(() => [...transactionHistory_data]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useMemo<ColumnDef<ITransactionHistory>[]>(
		() => [
			{
				accessorKey: "id",
				cell: (info) => <>#{info.getValue()}</>,
				header: () => <span>Transaction ID</span>,
			},
			{
				accessorKey: "event",
				cell: (info) => {
					switch (info.getValue()) {
						case "Credited":
							return (
								<text className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-lime-600 mr-1" />
									<span className="text-lime-600">
										Credited
									</span>
								</text>
							);
						case "Withdrawal":
							return (
								<text className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-red-500 mr-1" />
									<span className="text-red-500">
										withdrawal
									</span>
								</text>
							);
						case "Listing fee":
							return (
								<text className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-green-500 mr-1" />
									<span className="text-green-500">
										Listing fee
									</span>
								</text>
							);
					}
				},
				header: () => <span>Event</span>,
			},
			{
				accessorKey: "summary",
				cell: (info) => info.getValue(),
				header: () => <span>Summary</span>,
			},
			{
				accessorKey: "date",
				cell: (info) => info.getValue(),
				header: () => <span>Date</span>,
			},
			{
				accessorKey: "amount",
				cell: (info) => info.getValue(),
				header: () => <span>Amount</span>,
			},

			{
				accessorKey: "action",
				cell: (info) => info.getValue(),
				header: () => <span>Action</span>,
			},
		],
		[]
	);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="overflow-auto">
			<table className="w-screen lg:w-full border-collapse">
				<thead className="p-4">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className="text-left font-medium p-3 text-slate-500 text-sm"
									key={header.id}
								>
									{header.index > 1 &&
									header.id !== "actions" ? (
										<text className="flex justify-between items-center w-fit">
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
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
				<tbody className="my-10 p-4">
					{table.getRowModel().rows.map((row) => (
						<tr
							className="px-2 odd:border-y-[1px] odd:border-slate-300"
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => {
								return (
									<td className="text-left p-2" key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default memo(TransactionHistory);
