import { FC, memo, useMemo, useState } from "react";

import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { MdDeleteOutline, MdPrint } from "react-icons/md";

import { ITransactionHistory } from "@/interfaces/tables.interface";
import { transactionHistory_data } from "@/constants/data";
import { ITransaction } from "@/interfaces/ITransaction";

interface TransactionHistoryProps {
	transactions: ITransaction[]
}

const TransactionHistory: FC<TransactionHistoryProps> = ({transactions}) => {
	const [data, setData] = useState(() => [...transactions]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useMemo<ColumnDef<ITransaction>[]>(
		() => [
			{
				accessorKey: "customId",
				cell: (info) => <>#{info.getValue()}</>,
				header: () => <span>Transaction ID</span>,
			},
			{
				accessorKey: "event",
				cell: (info) => {
					switch (info.getValue()) {
						case "Credited":
							return (
								<span className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-lime-600 mr-1" />
									<span className="text-lime-600">
										Credited
									</span>
								</span>
							);
						case "Withdrawal":
							return (
								<span className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-red-500 mr-1" />
									<span className="text-red-500">
										withdrawal
									</span>
								</span>
							);
						case "Listing fee":
							return (
								<span className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-green-500 mr-1" />
									<span className="text-green-500">
										Listing fee
									</span>
								</span>
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
				cell: ({ getValue }) => (
					<>&#x20A6;{(getValue() as number).toLocaleString()}</>
				),
				header: () => <span>Amount</span>,
			},

			{
				accessorKey: "action",
				header: () => <>Actions</>,
				cell: ({ cell, row }) => {
					return (
						<div className="flex items-center space-x-2">
							<button
								className={
									"text-sm transition ease-out duration-200 hover:scale-105"
								}
							>
								<MdPrint />
							</button>
							<button
								onClick={() =>
									setData(
										data.filter(
											(_, id) => row.index !== id,
										),
									)
								}
								className={
									"text-sm transition ease-out duration-200 hover:scale-105"
								}
							>
								<MdDeleteOutline />
							</button>
						</div>
					);
				},
			},
		],
		[data],
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
			<table className="w-full relative overflow-auto  border-collapse">
				<thead className="p-4">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className="text-left font-semibold p-1 text-afruna-gray/70 text-[12px]"
									key={header.id}
								>
									{header.index > 1 &&
									header.id !== "actions" ? (
										<span className="flex justify-between items-center w-fit">
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</span>
									) : (
										flexRender(
											header.column.columnDef.header,
											header.getContext(),
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
									<td
										className="px-1 py-3 text-left text-[14px]"
										key={cell.id}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
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
