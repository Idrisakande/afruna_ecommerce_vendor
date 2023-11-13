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

import Link from "next/link";

import recent_itemsUtil from "@/utils/recent_items.util";
import {
	T_order,
	T_updated_order,
	T_updated_user_order,
} from "@/types/user.type";
import Order from "@/services/order.service";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { setViewOrderData } from "@/redux/features/user.slice";
import { ResultsFallback } from "../ResultsFallback";
import User from "@/services/user.service";

const RecentOrderTable: FC = () => {
	const router = useRouter();
	const { orders } = useSelector((state: RootState) => state.user);
	const recent_orders = useMemo(() => {
		return recent_itemsUtil(orders, 30).slice(0,9) as T_order[];
	}, [orders]);
	const dispatch = useDispatch();
	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useMemo<ColumnDef<T_order>[]>(
		() => [
			{
				accessorKey: "customId",
				cell: (info) => {
					const id = `${info.getValue()}`;
					return <div className="ml-2">{id}</div>;
				},
				header: () => <span className="">ID</span>,
			},
			{
				accessorKey: "coverPhoto",
				cell: ({ row }) => {
					return (
						<Image
							className="w-12 h-12 object-fill rounded-md border-[1px] shadow-sm"
							src={row.original.productId?.images[0]}
							width={40}
							height={40}
							priority
							alt="item Image"
						/>
					);
				},
				header: () => <span className="">Image</span>,
			},
			{
				accessorKey: "productName",
				cell: ({ row }) => {
					return (
						<div className="ml-2">
							{row.original.productId?.name}
						</div>
					);
				},
				header: () => <span className="">Item Name</span>,
			},
			{
				accessorKey: "quantity",
				cell: (info) => info.getValue(),
				header: () => <span className="">Quantity</span>,
			},
			{
				accessorKey: "createdAt",
				cell: (info) => info.getValue(),
				header: () => <span className="">Order Date</span>,
			},
			{
				accessorKey: "deliveryStatus",
				cell: ({ cell }) => {
					switch (cell.getValue()) {
						case "Pending":
							return (
								<span className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-amber-500 mr-1" />
									<span className="text-amber-500">
										Pending
									</span>
								</span>
							);
						case "Paid":
							return (
								<span className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-lime-600 mr-1" />
									<span className="text-lime-600">Paid</span>
								</span>
							);
						case "Cancelled":
							return (
								<span className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-red-500 mr-1" />
									<span className="text-red-500">
										Cancelled
									</span>
								</span>
							);
						case "Shipped":
							return (
								<span className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-blue-500 mr-1" />
									<span className="text-blue-500">
										Shipped
									</span>
								</span>
							);
					}
				},
				header: () => <span className="">Status</span>,
			},
			{
				accessorKey: "total",
				cell: ({ cell }) => (
					<>&#x20A6;{(cell.getValue() as number).toLocaleString()}</>
				),
				header: () => <span className="">Price</span>,
			},
			{
				accessorKey: "actions",
				cell: ({ row }) => (
					<div className="flex justify-start gap-3 items-center">
						<button
							onClick={async () => {
								const ordersServices = new Order();
								ordersServices.getOrdersBySessionId(
									row.original.sessionId,
								);
								const userServices = new User();
								const buyerInfo =
									await userServices.getUserById(
										row.original.vendorId,
									);
								router.push("/orders/details");
							}}
							className="hover:scale-90 border-none transition duration-300"
						>
							<MdRemoveRedEye size={24} />
						</button>
						{/* 	<button
							className="hover:scale-90 border-none transition duration-300"
							onClick={() => {
								const newData = data.filter(
									(_, idx) => idx !== row.index,
								);
								setData(newData);
							}}
						>
							<MdDeleteOutline size={24} />
						</button> */}
					</div>
				),
				header: () => <span className="">Action</span>,
			},
		],
		[recent_orders],
	);
	const table = useReactTable({
		data: recent_orders,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});
	if (!recent_orders.length) return <ResultsFallback/>;
	return (
		<div className="w-screen lg:w-full relative text-center items-center">
			{(
				<table className="w-screen px-2 lg:w-full h-[45vh]  relative">
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
													header.column.columnDef
														.header,
													header.getContext(),
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
													header.column.columnDef
														.header,
													header.getContext(),
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
													cell.getContext(),
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			) }
		</div>
	);
};

export default memo(RecentOrderTable);
