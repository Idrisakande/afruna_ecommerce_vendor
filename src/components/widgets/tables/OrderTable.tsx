import { IOrder } from "@/interfaces/tables.interface";
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
import { FC, memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdRemoveRedEye, MdSearch } from "react-icons/md";
import Image from "next/image";

import { months, orderData } from "@/constants/data";
import { InputLabel } from "../Input/InputLabel";
import { SelectPicker } from "../SelectPicker";
import { IOrderContext, OrdersContext } from "@/contexts/OrdersProvider";
import { ResultsFallback } from "../ResultsFallback";
import { formattedDate } from "@/utils/formatted_date";
import { createPaginationWithCustomType } from "@/utils/createPaginationWithCustomType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { T_order, T_updated_user_order, T_user_order } from "@/types/user.type";
import { setViewOrderData } from "@/redux/features/user.slice";
import useCustomSearch from "@/hooks/useCustomSearch";

export const OrderTable: FC = memo(() => {
	const router = useRouter();
	const { selectedFilter } = useContext(OrdersContext) as IOrderContext;
	const [sorting, setSorting] = useState<SortingState>([]);
	const { orders } = useSelector((state: RootState) => state.user);
	const [data, setData] = useState(orders);
	const dispatch = useDispatch();
	useEffect(() => {
		if (selectedFilter === "All Orders") {
			setData(orders);
		} else {
			const orders_cast = orders as T_user_order[];
			const newData = orders_cast.filter(
				(datum) => datum.items[0].deliveryStatus === selectedFilter,
			);
			setData(newData);
		}
	}, [selectedFilter]);

	const {
		filteredItems,
		updateDateFilter,
		updateMonthFilter,
		updateSearchTerm,
	} = useCustomSearch<T_user_order>(data);
	const handleSearch = useCallback((val: string) => {
		// console.log(val); 
		
		updateSearchTerm(val);
		if (val === undefined || val === '' ) {
			setData(data);
		} /* else {
			setData(filteredItems);
		} */
	}, [filteredItems]);
	console.log(filteredItems);
	// const handleMonthFilter  = useCallback((val: any) => updateMonthFilter(""), [data]);
	// const handleDateFilter  = useCallback((val: any) => updateDateFilter(""), [data]);

	const columns = useMemo<
		ColumnDef<T_order | T_user_order | T_updated_user_order>[]
	>(
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
				cell: (info) => {
					let image = info.getValue() as string;
					return (
						<Image
							className="w-12 h-12 object-fill rounded-md border-[1px] shadow-sm"
							src={image}
							width={40}
							height={40}
							alt="item Image"
						/>
					);
				},
				header: () => <span className="">Image</span>,
			},
			{
				accessorKey: "productName",
				cell: (info) => {
					const itemName = `${info.getValue()}`;
					return <div className="ml-2">{itemName}</div>;
				},
				header: () => <span className="">Item Name</span>,
			},
			{
				accessorKey: "items",
				cell: (info) =>
					info ? (info.getValue() as T_order[])[0].quantity : null,
				header: () => <span className="">Quantity</span>,
			},
			{
				accessorKey: "createdAt",
				cell: (info) => info.getValue(),
				header: () => <span className="">Order Date</span>,
			},
			{
				accessorKey: "items",
				cell: ({ cell }) => {
					switch (
						(cell.getValue() as T_order[])[0].deliveryStatus //gets to the item file an
					) {
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
				accessorKey: "total",
				cell: ({ cell }) => (
					<>${(cell.getValue() as number).toLocaleString()}</>
				),
				header: () => <span className="">Price</span>,
			},
			{
				accessorKey: "actions",
				cell: ({ row }) => (
					<div className="flex justify-start gap-3 items-center">
						<button
							onClick={() => {
								console.log(row.original);
								dispatch(setViewOrderData(row.original));
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
		[data],
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		enableRowSelection: true,
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
	});
	if (!data.length) {
		return <ResultsFallback />;
	}

	return (
		<main className="relative">
			<div className="my-10 w-full  h-[85vh] pb-2 bg-white overflow-auto rounded-md border shadow-sm border-slate-300">
				<header className="flex sticky top-0 justify-between items-center border-b border-slate-300 text-afruna-blue bg-white ">
					<h1 className="p-3 font-bold ">Orders</h1>
					<div className="flex justify-between items-center p-3 space-x-2">
						<InputLabel
							getValue={(v)=>handleSearch(v as string)}
							placeholder={"Search"}
							inputClassName="text-sm p-1"
							inputsuffixIcon={
								<button>
									<MdSearch />
								</button>
							}
							type={"text"}
						/>
						<SelectPicker
							triggerClassName="relative top-[5px] flex w-24 justify-between items-center space-x-1 text-[12px] p-[11px] border border-afruna-gray/30 rounded-md"
							placeholder="Months"
							getSelected={(val) => console.log(val)}
							items={months}
						/>
						<SelectPicker
							triggerClassName="relative top-[5px] flex w-24 justify-between items-center space-x-1 text-[12px] p-[11px] border border-afruna-gray/30 rounded-md"
							placeholder="Select"
							getSelected={(val) => console.log(val)}
							items={[
								"This Month",
								"3 Days",
								"1 Week",
								"2 Months",
								"6 Months",
							]}
						/>
					</div>
				</header>
				<table className="w-screen lg:w-full px-8 relative">
					<thead className=" sticky top-16 bg-white">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr
								className="text-left text-afruna-gray text-[12px] font-extralight"
								key={headerGroup.id}
							>
								{headerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.index > 1 &&
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
					<tbody className="">
						{table.getRowModel().rows.map((row) => {
							return (
								<tr
									className="text-left odd:border-y-[1px] odd:border-slate-300 text-afruna-blue text-[12px]"
									key={row.original._id}
								>
									{row.getVisibleCells().map((cell) => {
										return (
											<td className="py-2" key={cell.id}>
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
			</div>
			<Pagination table={table} />
		</main>
	);
});

const Pagination = createPaginationWithCustomType<
	T_order | T_user_order | T_updated_user_order
>();
