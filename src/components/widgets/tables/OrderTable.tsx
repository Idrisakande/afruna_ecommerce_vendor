import { IOrder } from "@/interfaces/tables.interface";
import * as Select from "@radix-ui/react-select";
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
import {
	FC,
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useRouter } from "next/router";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdRemoveRedEye, MdSearch } from "react-icons/md";
import Image from "next/image";

import { dateInterval, months, orderData, ordersStatus } from "@/constants/data";
import { IOrderContext, OrdersContext } from "@/contexts/OrdersProvider";
import { ResultsFallback } from "../ResultsFallback";
import { formattedDate } from "@/utils/formatted_date";
import { createPaginationWithCustomType } from "@/utils/createPaginationWithCustomType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { T_order} from "@/types/user.type";
import Order from "@/services/order.service";
import User from "@/services/user.service";
import { SelectItem } from "../SelectItem";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { GoSearch } from "react-icons/go";
import useSearchOrders from "@/hooks/useSearchOrders";
import { updateOrderBuyerInfo } from "@/redux/features/user.slice";
import { verifyImageUrl } from "@/utils/verify_image_url";

export const OrderTable: FC = memo(() => {
	const { orders,bio_data } = useSelector((state: RootState) => state.user);
	const {
		searchInput,
		searchResult,
		statusFilter,
		sortingType,
		setSearchInput,
		setSortingType,
		setTimePeriod,
		setStatusFilter,
	} = useSearchOrders({ data: orders,period:"all" });
	
	const { selectedFilter } = useContext(OrdersContext) as IOrderContext;
	const [data, setData] = useState(orders);
	
	useMemo(() => {
		if (selectedFilter.toLowerCase() === "all orders") {
			setData(searchResult);
		} else {
			const matchedFilter = searchResult.filter(
				(order) =>
					order.deliveryStatus.toLowerCase() ===
					selectedFilter.toLowerCase(),
			);
			setData(matchedFilter);
		}
	}, [selectedFilter,searchResult]);
	const router = useRouter();
	const [sorting, setSorting] = useState<SortingState>([]);
	const dispatch = useDispatch();

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
				accessorKey: "productId",
				cell: ({ row }) => {
					return (
						<Image
							className="w-12 h-12 object-fill rounded-md border-[1px] shadow-sm"
							src={verifyImageUrl(row.original.productId?.images[0])}
							width={40}
							height={40}
							alt="item Image"
						/>
					);
				},
				header: () => <span className="">Image</span>,
			},
			{
				accessorKey: "item name",
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
				cell: (info) => formattedDate(info.getValue() as string),
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
								dispatch(updateOrderBuyerInfo(buyerInfo));
								router.push("/orders/details");
							}}
							className="hover:scale-90 border-none transition duration-300"
						>
							<MdRemoveRedEye size={24} />
						</button>
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
		debugTable: false,
	});

	
	return (
		<main className="relative">
			<div className="my-10 w-full  h-[85vh] pb-2 bg-white overflow-auto rounded-md border shadow-sm border-slate-300">
				<header className="flex sticky top-0 justify-between items-center border-b border-slate-300 text-afruna-blue bg-white ">
					<h1 className="p-3 font-bold ">Orders</h1>
					<div className="flex justify-between items-center p-3 space-x-2">
						<fieldset className="xs:col-span-full lg:col-span-2 overflow-hidden text-[#777777] border border-slate-300 flex justify-between items-center rounded-xl">
								<input
									value={searchInput}
									onChange={(e)=>setSearchInput(e.target.value)}
									type="search"
									placeholder="Search"
									name="search"
									className="w-full text-base p-3 outline-none focus:outline focus:outline-1 focus:outline-blue focus:bg-white"
								/>
								<GoSearch className="text-slate-200 w-16 text-2xl cursor-pointer" />
							</fieldset>
							<Select.Root onValueChange={setTimePeriod as (value: string) => void}>
								<Select.Trigger className="flex items-center gap-2 p-3 border rounded-lg">
									<Select.Value
										placeholder={"Select range"}
									/>
									<Select.Icon>
										<ChevronDownIcon />
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content
										className="p-2 bg-white gap-2"
										position="popper"
									>
										<Select.Viewport>
											{dateInterval.map((date) => (
												<SelectItem
													key={date}
													value={date}
												>
													{date}
												</SelectItem>
											))}
										</Select.Viewport>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
							<Select.Root onValueChange={setStatusFilter as (value: string) => void}>
								<Select.Trigger className="flex items-center gap-2 p-3 border rounded-lg">
									<Select.Value
										placeholder={"Status"}
									/>
									<Select.Icon>
										<ChevronDownIcon />
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content
										className="p-2 bg-white gap-2"
										position="popper"
									>
										<Select.Viewport>
											{ordersStatus.map((date) => (
												<SelectItem
													key={date}
													value={date}
												>
													{date}
												</SelectItem>
											))}
										</Select.Viewport>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
						
					</div>
				</header>
				{ orders && orders.length > 0?
					(<table className="w-screen lg:w-full px-8 relative">
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
										key={
											row.original._id ??
											Math.ceil(
												Math.random() *
												row.original.quantity,
											)
										}
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
					</table>):<ResultsFallback />}
			</div>
			{data && data.length > 0 && <Pagination table={table} />}
		</main>
	);
});

const Pagination = createPaginationWithCustomType<T_order>();
