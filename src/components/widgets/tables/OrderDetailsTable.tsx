import { OrederDetailsData } from "@/constants/data";
import { IOrederDetails } from "@/interfaces/tables.interface";
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
import { FC, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { T_orderBySessionId, T_updated_user_order } from "@/types/user.type";
import { formattedDate } from "@/utils/formatted_date";
import { verifyImageUrl } from "@/utils/verify_image_url";

interface OrderDetailsTableProps {}

export const OrderDetailsTable: FC<OrderDetailsTableProps> = ({}) => {
	const { viewOrder, orderBySessionId } = useSelector(
		(state: RootState) => state.user,
	);
	/* const data = useMemo(()=> {
		if (viewOrder){
			let info = viewOrder as T_updated_user_order;
			return info.items;
		}
	},[viewOrder]) */
	const [rowSelection, setRowSelection] = useState({});
	// const [globalFilter, setGlobalFilter] = useState("");
	// const [data, setData] = useState([...OrederDetailsData]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const columns = useMemo<ColumnDef<T_orderBySessionId>[]>(
		() => [
			{
				accessorKey: "customId",
				cell: (info) => `${info.getValue()}`,
				header: () => (
					<span className="text-sm text-[#7C7C7C]">ID</span>
				),
			},
			{
				accessorKey: "productId",
				cell: ({ row }) => (
					<Image
						src={verifyImageUrl(row.original.productId?.images[0])}
						width={45}
						height={45}
						alt="order-image"
						className="rounded"
					/>
				),
				header: () => (
					<span className="text-sm text-[#7C7C7C]">Image</span>
				),
			},
			{
				accessorKey: "name",
				cell: ({ row }) => row.original.productId?.name,
				header: () => (
					<span className="text-sm text-[#7C7C7C]">item Name</span>
				),
			},
			{
				accessorKey: "quantity",
				cell: (info) => {
					return info.getValue();
				},
				header: () => (
					<span className="text-sm text-[#7C7C7C]">Quantity</span>
				),
			},
			{
				accessorKey: "createdAt",
				cell: (info) => formattedDate(info.getValue() as string),
				header: () => (
					<span className="text-sm text-[#7C7C7C]">Order Date</span>
				),
			},
			{
				accessorKey: "total",
				cell: (info) => info.getValue(),
				header: () => (
					<span className="text-sm text-[#7C7C7C]">Amount</span>
				),
			},
		],
		[],
	);

	const table = useReactTable({
		data:orderBySessionId,
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
		// <div className="my-8 w-full">
		<ScrollArea.Root className="ScrollAreaRoot w-full h-[72vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
			<ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
				<table className=" w-screen lg:w-full px-8 relative">
					<thead className="sticky top-0 bg-white">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										className="text-left font-medium pt-6 pb-2 text-[#7C7C7C] text-sm"
										key={header.id}
									>
										{header &&
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="my-1">
						{table.getRowModel().rows.map((row) => {
							return (
								<tr
									className="px-2 odd:border-y-[1px] odd:border-slate-300"
									key={row.id}
								>
									{row.getVisibleCells().map((cell) => {
										return (
											<td
												className="py-4 font-semibold text-left text-[0.8rem]"
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
							);
						})}
					</tbody>
				</table>
				<div className="flex flex-col items-end justify-end pt-8 border-t border-slate-300">
					<div className="max-w-[20rem] w-full gap-10 flex justify-between items-center">
						<div className="flex flex-col min-w-[50%] gap-5 justify-start">
							<h3 className="text-sm text-[#777687] font-semibold">
								Sub Total:
							</h3>
							<h3 className="text-sm text-[#777687] font-semibold">
								Extimated Tax (12.5%):
							</h3>
							<h3 className="text-sm text-[#777687] font-semibold">
								Shipping Charge:
							</h3>
							<h3 className="text-sm text-[#777687] font-semibold">
								Discount (LafrunaT3):
							</h3>
						</div>
						<div className="flex flex-col gap-5 min-w-[50%] justify-start">
							{orderBySessionId.map((order,key) => (
								<span key={key} className="text-sm text-[#777687] font-semibold">
									&#x20A6;{order.total}
								</span>
							))}
						</div>
					</div>
					<div className="max-w-[20rem] mt-6 pt-8 w-full border-t border-slate-300 gap-10 flex justify-between items-center">
						<div className="flex flex-col min-w-[50%] gap-5 justify-start">
							<h3 className="text-sm text-[#777687] font-semibold">
								Total (NGN):
							</h3>
						</div>
						<div className="flex flex-col gap-5 min-w-[50%] justify-start">
							<span className="text-sm text-[#777687] font-semibold">
								&#x20A6;{orderBySessionId.reduce((acc,val)=>acc+val.total,0)}
							</span>
						</div>
					</div>
				</div>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-0 flex bg-slate-100 hover:bg-slate-200"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
			</ScrollArea.Scrollbar>
			<ScrollArea.Scrollbar
				className="ScrollAreaScrollbar lg:hidden p-[2px] rounded-xl` flex bg-slate-100 hover:bg-slate-200 "
				orientation="horizontal"
			>
				<ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner className="bg-slate-100 hover:bg-slate-200" />
		</ScrollArea.Root>
	);
};
