import { IOrder } from "@/interfaces/tables.interface";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
	ColumnDef,
	SortingState,
	Table,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { FC, memo, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BiCaretRight, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MdRemoveRedEye, MdSearch } from "react-icons/md";
import Image from "next/image";

import { orderData } from "@/constants/data";
import { InputLabel } from "../Input/InputLabel";
import { SelectPicker } from "../SelectPicker";
import { IOrderContext, OrdersContext } from "@/contexts/OrdersProvider";
import { ResultsFallback } from "../ResultsFallback";
import { formattedDate } from "@/utils/formatted_date";
import { RxChevronLeft, RxChevronRight, RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
// import { useSelector } from "react-redux";
// import { RootState } from "@/types/store.type";

export const OrderTable: FC = memo(() => {
	const router = useRouter();
	const { selectedFilter } = useContext(OrdersContext) as IOrderContext;
	// const { orders } = useSelector((state: RootState) => state.user);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [data, setData] = useState(orderData);

	useMemo(() => {
		if (selectedFilter === "All Orders") {
			setData(orderData);
		} else {
			const newData = orderData.filter(
				(datum) => datum.delivery_status === selectedFilter,
			);
			setData(newData);
		}
	}, [selectedFilter]);

	const columns = useMemo<ColumnDef<IOrder>[]>(
		() => [
			{
				accessorKey: "id",
				cell: (info) => {
					const id = `#${info.getValue()}`;
					return <div className="ml-2">{id.slice(0, 7)}</div>;
				},
				header: () => <span>ID</span>,
			},
			{
				accessorKey: "img",
				cell: ({ getValue }) => {
					const image = getValue() as string;
					return (
						<Image
							width={35}
							height={35}
							className="rounded-md w-12 h-12 object-fill border border-afruna-base/40"
							src={image}
							alt="Item_Img "
						/>
					);
				},
				header: () => <span>Image</span>,
			},
			{
				accessorKey: "buyers_name",
				cell: ({ getValue }) => getValue(),
				header: () => <span>Item Name</span>,
			},
			{
				accessorKey: "amount",
				cell: ({ getValue }) => getValue(),
				header: () => <span>Quantity</span>,
			},
			{
				accessorKey: "delivery_date",

				cell: ({ getValue }) =>
					formattedDate(getValue as unknown as string),
				header: () => <span>Order Date</span>,
			},
			{
				accessorKey: "delivery_status",
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
				accessorKey: "method_of_payment",
				cell: (info) => info.getValue() as number,
				// cell: (info) => `$${(info.getValue()as number).toLocaleString()}`,
				header: () => <span>Amount</span>,
			},
			{
				id: "actions",
				cell: ({ row }) => (
					<div className="flex justify-between items-center">
						<button
							onClick={() => {
								router.push({
									pathname: `/orders/details`,
									// query: row.original,
								});
							}}
							className="hover:scale-90 border-none transition duration-300"
						>
							<MdRemoveRedEye size={24} />
						</button>
					</div>
				),
				header: () => <span>Action</span>,
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
						getValue={(val) => console.log("")}
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
												header.column.columnDef.header,
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
												header.column.columnDef.header,
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

function createPaginationWithCustomType<T>() {
	// Create a new type that extends CustomType with an additional property
	type TTable = Table<T>;

	// Define a pagination component that uses the extended table type [TTable]
	return ({ table }: { table: TTable }) => {
		const pageCount = table.getPageCount();
		const next = table.nextPage;
		const previous = table.previousPage;
		const canGoBackward = !table.getCanPreviousPage();
		const canGoForward = !table.getCanNextPage();
		return (
			<div className="h-fit mt-2 absolute right-0 pb-20">
				<div className="flex text-md text-afruna-blue items-center gap-2">
					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={()=> table.setPageIndex(0)}
						disabled={!canGoBackward}
						>
						<RxDoubleArrowLeft />
					</button>
					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={previous}
						disabled={!canGoBackward}
						>
						<RxChevronLeft />
					</button>
<button
						className="w-7 h-7 text-sm bg-white rounded p-1"
						
						
						>
						{table.getPageCount()}
					</button>
					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={next}
						disabled={!table.getCan}
						>
						<RxChevronRight/>
					</button>
					<button
						className="w-7 h-7 bg-white rounded p-1"
						onClick={()=> table.setPageIndex(table.getPageCount() -1)}
						disabled={!canGoForward}
					>
						<RxDoubleArrowRight />
					</button>
				</div>
			</div>
		);
	};
}

const Pagination = memo(createPaginationWithCustomType<IOrder>());
