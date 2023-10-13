import { FC, memo, useEffect, useMemo, useState } from "react";

import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { RootState } from "@/types/store.type";
import { IProduct } from "@/interfaces/IProductItem";
import Products from "@/services/products.service";
import { formattedDate } from "@/utils/formatted_date";

type T_data = IProduct & { categoryName: string };
const ProductListingTable: FC = () => {
	const { products } = useSelector((state: RootState) => state.products);
	const { categories } = useSelector((state: RootState) => state.categories);

	const [data, setData] = useState<T_data[]>([]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useMemo<ColumnDef<T_data>[]>(
		() => [
			{
				accessorKey: "_id",
				cell: (info) => {
					const id = info.getValue() as string;
					return <div className="ml-2">#{id.slice(0, 7)}</div>;
				},
				header: () => <span className="">Product ID</span>,
			},
			{
				accessorKey: "coverPhoto",
				cell: ({ cell }) => {
					let image = cell.getValue() as string[];
					return (
						<Image
							className="w-12 h-12 object-fill rounded-md border-[1px] shadow-sm"
							src={image[0]}
							width={40}
							height={40}
							alt="item Image"
						/>
					);
				},
				header: () => <span className="">Image</span>,
			},
			{
				accessorKey: "name",
				cell: (info) => {
					const itemName = `${info.getValue()}`;
					return <div className="ml-2">{itemName}</div>;
				},
				header: () => <span className="">Item Name</span>,
			},
			{
				accessorKey: "categoryName",
				cell: (info) => {
					let items = `${info.getValue()}`;
					return <div className="ml-2">{items}</div>;
				},
				header: () => <span className="">Category</span>,
			},
			{
				accessorKey: "createdAt",
				cell: (info) => formattedDate(info.getValue() as string),
				header: () => <span className="">Date</span>,
			},
			/* {
				accessorKey: "status",
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
			}, */
			{
				accessorKey: "price",
				cell: ({ cell }) => (
					<>&#x20A6;{(cell.getValue() as number).toLocaleString()}</>
				),
				header: () => <span className="">Price</span>,
			},
			{
				accessorKey: "actions",
				cell: ({ row }) => (
					<div className="flex justify-start gap-3 items-center">
						<Link
							href={"/products/"+row.original._id}
							className="hover:scale-90 border-none transition duration-300"
						>
							<MdRemoveRedEye size={24} />
						</Link>
						<button
							className="hover:scale-90 border-none transition duration-300"
							onClick={() => {
								const productsService = new Products();
								productsService.deleteproduct(row.original._id);
							}}
						>
							<MdDeleteOutline size={24} />
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
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	useEffect(() => {
		if (products) {
			const max_sorted_products = products.slice(0, 7); // Use slice to get the first 7 elements

			let max_categories = [] as unknown as T_data[];

			//compare categoryid and modify the data with the category name that matches with category id
			for (let i in categories) {
				for (let j in max_sorted_products) {
					if (
						max_sorted_products[j].categoryId === categories[i]._id
					) {
						max_categories.push({
							categoryName: categories[i].name,
							...max_sorted_products[j],
						});
					}
				}
			}
			setData(max_categories);
		}
	}, [products, categories]);

	if (!data) return <></>;
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
		</div>
	);
};

export default memo(ProductListingTable);
