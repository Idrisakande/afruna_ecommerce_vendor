import { FC, ReactNode, memo, useState } from "react";

import {
	SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { images } from "@/constants/images";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

type Sales = {
	product: ReactNode;
	price: number;
	sold: number;
};

interface SalesTableProps {}
const defaultData: Sales[] = [
	{
		price: 200,
		product: (
			<div className="flex items-center">
				<Image
					src={images.product}
					alt="product"
					width={30}
					height={30}
				/>
				<span className="ml-2">Product</span>
			</div>
		),
		sold: 729,
	},
	{
		price: 945,
		product: (
			<div className="flex items-center">
				<Image
					src={images.product1}
					alt="product"
					width={30}
					height={30}
				/>
				<span className="ml-2">Product Two</span>
			</div>
		),
		sold: 1202,
	},
	{
		price: 338,
		product: (
			<div className="flex items-center">
				<Image
					src={images.product2}
					alt="product"
					width={30}
					height={30}
				/>
				<span className="ml-2">Dress</span>
			</div>
		),
		sold: 132,
	},
	{
		price: 338,
		product: (
			<div className="flex items-center">
				<Image
					src={images.product3}
					alt="product"
					width={30}
					height={30}
				/>
				<span className="ml-2">Cropped Top</span>
			</div>
		),
		sold: 132,
	},
	{
		price: 103,
		product: (
			<div className="flex items-center">
				<Image
					src={images.product4}
					alt="product"
					width={30}
					height={30}
				/>
				<span className="ml-2">Bag</span>
			</div>
		),
		sold: 23,
	},
];

const columnHelper = createColumnHelper<Sales>();

const columns = [
	columnHelper.accessor((row) => row.product, {
		id: "product",
		cell: (info) => info.getValue(),
		header: () => <span>Product</span>,
	}),
	columnHelper.accessor((row) => row.price, {
		id: "price",
		cell: (info) => info.getValue(),
		header: () => <span>Price</span>,
	}),
	columnHelper.accessor((row) => row.sold, {
		id: "sold",
		cell: (info) => info.getValue(),
		header: () => <span>Sold</span>,
	}),
];
const SalesTable: FC<SalesTableProps> = () => {
	const [data] = useState(() => [...defaultData]);

	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// debugTable: true,
	});
	return (
		<table className="bg-white w-full">
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th className="text-left p-3" key={header.id}>
								{/* {header.isPlaceholder ? null : ( */}
								{header.column.id !== "product" ? (
									<>
										<button
											className="flex justify-center items-center"
											onClick={() =>
												header.column.toggleSorting()
											}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: <GoChevronUp />,
												desc: <GoChevronDown />,
											}[
												header.column.getIsSorted() as string
											] ?? <GoChevronDown />}
										</button>
									</>
								) : (
									flexRender(
										header.column.columnDef.header,
										header.getContext()
									)
								)}

								{/* )} */}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody className="my-10">
				{table.getRowModel().rows.map((row) => (
					<tr
						className="odd:border-y-[1px] odd:border-slate-300"
						key={row.id}
					>
						{row.getVisibleCells().map((cell) => (
							<td className="text-left p-2" key={cell.id}>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default memo(SalesTable);
