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
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { IRecentOrders } from "@/interfaces/tables.interface";
import { recent_order } from "@/constants/data";
import Link from "next/link";

interface ProductListingProps {}

const REcentOrderTable: FC<ProductListingProps> = () => {
	const [data, setData] = useState(() => [...recent_order]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useMemo<ColumnDef<IRecentOrders>[]>(
		() => [
			{
				accessorKey: "id",
				cell: (info) => {
					const id = `#${info.getValue()}`;
					return <div className="ml-2">{id}</div>;
				},
				header: () => <span className="">Product ID</span>,
			},
			{
				accessorKey: "image",
				cell: ({ cell }) => (
					<Image
						className="w-[45px] h-[45px] object-fill rounded-md border-[1px] shadow-sm"
						src={cell.getValue() as unknown as string}
						width={40}
						height={40}
						alt="item Image"
					/>
				),
				header: () => <span className="">Image</span>,
			},
			{
				accessorKey: "itm_name",
				cell: (info) => {
					const itemName = `${info.getValue()}`;
					return <div className="ml-2">{itemName}</div>;
				},
				header: () => <span className="">Item Name</span>,
			},
			{
				accessorKey: "category",
				cell: () => {
					let items = ["Fashion", "COD", "Electronics", "Agros"];
					let idx = Math.floor(Math.random() * items.length);
					return items[idx];
				},
				header: () => <span className="">Category</span>,
			},
			{
				accessorKey: "order_date",
				cell: (info) => info.getValue(),
				header: () => <span className="">Order Date</span>,
			},
			{
				accessorKey: "status",
				cell: ({ cell }) => {
					switch (cell.getValue()) {
						case "Pending":
							return (
								<text className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-amber-500 mr-1" />
									<span className="text-amber-500">
										Pending
									</span>
								</text>
							);
						case "Paid":
							return (
								<text className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-lime-600 mr-1" />
									<span className="text-lime-600">Paid</span>
								</text>
							);
						case "Cancelled":
							return (
								<text className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-red-500 mr-1" />
									<span className="text-red-500">
										Cancelled
									</span>
								</text>
							);
						case "Shipped":
							return (
								<text className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-blue-500 mr-1" />
									<span className="text-blue-500">
										Shipped
									</span>
								</text>
							);
					}
				},
				header: () => <span className="">Status</span>,
			},
			{
				accessorKey: "amount",
				cell: ({ cell }) => <>${cell.getValue()}</>,
				header: () => <span className="">Price</span>,
			},
			{
				accessorKey: "actions",
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
								const newData = data.filter(
									(_, idx) => idx !== row.index
								);
								setData(newData);
							}}
						>
							<MdDeleteOutline size={24} />
						</button>
					</div>
				),
				header: () => <span className="">Action</span>,
			},
		],
		[data]
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
		<div className="w-screen lg:w-full relative">
			<table className="w-screen px-2 lg:w-full  relative">
				<thead className="sticky  bg-white top-[4.3rem] left-0 right-0">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							className="text-left text-afruna-gray text-[12px] font-extralight"
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.index > 2 &&
									header.id !== "actions" ? (
										<div className="flex px-1 justify-between items-center w-fit">
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
													className="relative bottom-[7px]"
												/>
											</span>
										</div>
									) : (
										<span className="px-2">
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</span>
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
								className="text-left odd:border-y-[1px] odd:border-slate-300 text-afruna-blue text-[12px]"
								key={row.id}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<td className="py-1" key={cell.id}>
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

export default memo(REcentOrderTable);
