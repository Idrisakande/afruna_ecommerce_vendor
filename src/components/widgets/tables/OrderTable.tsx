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
import {
	FC,
	HTMLProps,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdDeleteOutline, MdRemoveRedEye, MdSearch } from "react-icons/md";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { InputLabel } from "../Input/InputLabel";
import { SelectPicker } from "../SelectPicker";
import { IOrderContext, OrdersContext } from "@/contexts/OrdersProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { T_order, T_updated_order } from "@/types/user.type";
import { useRouter } from "next/router";

export const OrderTable: FC = () => {
	const router = useRouter()
	const [rowSelection, setRowSelection] = useState({});
	const { selectedFilter } = useContext(OrdersContext) as IOrderContext;
	const { orders } = useSelector((state: RootState) => state.user);

	const filter = useMemo(() => {
		if (selectedFilter !== "All Orders") {
			return orders.filter(
				(type) => type.deliveryStatus === selectedFilter,
			);
		} else return orders;
	}, [orders, selectedFilter]);
	const [sorting, setSorting] = useState<SortingState>([]);


	const columns = useMemo<ColumnDef<T_order|T_updated_order>[]>(
		() => [
			{
				accessorKey: "_id",
				cell: (info) => {
					const id = `#${info.getValue()}`;
					return <div className="ml-2">{id.slice(0,7)}</div>;
				},
				header: () => <span>ID</span>,
			},
			{
				accessorKey: "coverPhoto",
				cell: ({ getValue }) => {
					const image = getValue() as string[];
					return (
						<Image
							width={35}
							height={35}
							className="rounded-md w-12 h-12 object-fill border border-afruna-base/40"
							src={image[0]}
							alt="Item_Img "
						/>
					);
				},
				header: () => <span>Image</span>,
			},
			{
				accessorKey: "quantity",
				cell: ({ getValue }) => getValue(),
				header: () => <span>Quantity</span>,
			},
			{
				accessorKey: "productName",
				cell: ({ getValue }) => getValue(),
				header: () => <span>Item Name</span>,
			},
			{
				accessorKey: "createdAt",

				cell: ({ getValue }) =>
					new Date(getValue() as string).toUTCString(),
				header: () => <span>Order Date</span>,
			},
			{
				accessorKey: "deliveryStatus",
				cell: ({ cell }) => {
					switch (cell.getValue()) {
						case "Pending":
							return (
								<div className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-[#FFC103] mr-1" />
									<span className="text-[#FFC103]">
										Pending
									</span>
								</div>
							);
						case "Shipped":
							return (
								<div className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-[#0D61FF] mr-1" />
									<span className="text-[#0D61FF]">
										Shipped
									</span>
								</div>
							);
						case "Delivered":
							return (
								<div className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-[#4D9A00] mr-1" />
									<span className="text-[#4D9A00]">
										Delivered
									</span>
								</div>
							);
						case "Pickup":
							return (
								<div className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-[#545ED7] mr-1" />
									<span className="text-[#545ED7]">
										Pickup
									</span>
								</div>
							);
						case "Canceled":
							return (
								<div className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-[#E93627] mr-1" />
									<span className="text-[#E93627]">
										Cancelled
									</span>
								</div>
							);
						default:
							return (
								<div className="flex justify-between items-center w-fit">
									<span className="p-1 rounded-full bg-[#00C9FF] mr-1" />
									<span className="text-[#00C9FF]">
										Returnedvered
									</span>
								</div>
							);
					}
				},
				header: () => <span>Status</span>,
			},
			{
				accessorKey: "total",
				cell: (info) => `$${(info.getValue()as number).toLocaleString()}`,
				header: () => <span>Amount</span>,
			},
			{
				id: "actions",
				cell: ({ row }) => (
					<div className="flex justify-between items-center">
						
							<button
							onClick={() =>
								router.push({
									pathname: `/orders/details`,
									query: row.original,
								})
							}
							className="hover:scale-90 border-none transition duration-300"
						>
							<MdRemoveRedEye size={24} />
						</button>
					</div>
				),
				header: () => <span>Action</span>,
			},
		],
		[filter],
	);

	const table = useReactTable({
		data:filter,
		columns,
		state: {
			rowSelection,
			sorting,
		},
		enableRowSelection: true,
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="my-10 w-full  h-[85vh] pb-2 bg-white overflow-auto rounded-md border shadow-sm border-slate-300">
			<header className="flex justify-between items-center border-b border-slate-300 text-afruna-blue">
				<h1 className="p-3 font-bold ">Orders</h1>
				<div className="flex justify-between items-center p-3 space-x-2">
					<InputLabel
						getValue={(val) => console.log(val)}
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
						items={["All", "January", "Febuary", "March", "April"]}
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
			<ScrollArea.Root className="px-4 ScrollAreaRoot w-full ">
				<ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
					<table className="w-screen lg:w-full px-8 relative">
						<thead className=" sticky top-0 bg-white">
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
										key={row.id}
									>
										{row.getVisibleCells().map((cell) => {
											return (
												<td
													className="py-2"
													key={cell.id}
												>
													{flexRender(
														cell.column.columnDef
															.cell,
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
									table.setPageIndex(
										table.getState().pagination.pageIndex,
									)
								}
							>
								{table.getState().pagination.pageIndex + 1}
							</button>
							<button
								onClick={() =>
									table.getCanNextPage() &&
									table.setPageIndex(
										table.getState().pagination.pageIndex +
											1,
									)
								}
							>
								{table.getState().pagination.pageIndex + 2}
							</button>
							<button
								onClick={() =>
									table.getState().pagination.pageIndex + 2 <
										table.getPageCount() &&
									table.setPageIndex(
										table.getState().pagination.pageIndex +
											1,
									)
								}
							>
								{table.getState().pagination.pageIndex + 3}
							</button>
						</>
					)}
					{table.getState().pagination.pageIndex > 5 && (
						<>
							<div>...</div>
							<button
								onClick={() =>
									table.setPageIndex(
										table.getState().pagination.pageSize,
									)
								}
							>
								{table.getPageCount() + 1}
							</button>
						</>
					)}
					<button
						className="border rounded p-1"
						onClick={() =>
							table.setPageIndex(table.getPageCount() - 1)
						}
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
				"w-4 h-4 text-slate-500 bg-white border-slate-300 rounded-md focus:ring-slate-900 dark:focus:ring-blue-900 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600",
			)}
			{...rest}
		/>
	);
}

// export default memo(OrderTable);
