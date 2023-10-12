import { useMemo, useState } from "react";
import { MdDeleteOutline, MdSearch } from "react-icons/md";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { InputLabel } from "@/components/widgets/Input/InputLabel";
import { SelectPicker } from "@/components/widgets/SelectPicker";
import { Header } from "@/components/products/Header";
import { Content } from "@/components/products/Content";
import { FaEye } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import { IBestSellingProduct } from "@/interfaces/IBestSellingProduct";
import { images } from "@/constants/images";
import { products } from "@/constants/data";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { IProduct } from "@/interfaces/IProductItem";
import { ResultsFallback } from "../ResultsFallback";

export const BestSellingProductsTable = () => {
	const {products } = useSelector((state: RootState) => state.products);
	const [data, setData] = useState(products);
	const columns = useMemo<ColumnDef<IProduct>[]>(
		() => [
			{
				accessorKey: "customId",
				header: () => <>Product Id</>,
				cell: ({ getValue }) => <># {getValue()}</>,
			},
			{
				accessorKey: "images",
				header: () => <>Image</>,
				cell: ({ row }) => (
					<Image
						priority
						width={40}
						height={40}
						className="w-10"
						src={row.original.coverPhoto[0]??images.afruna_logo}
						alt="product_iamge"
					/>
				),
			},
			{
				accessorKey: "name",
				header: () => <>Product Name</>,
				cell: ({ getValue }) => <>{getValue()}</>,
			},
			{
				accessorKey: "price",
				header: () => <>Price</>,
				cell: ({ getValue }) => (
					<>
						&#x20A6;{" "}
						{(getValue() as number).toLocaleString("en-US")}
					</>
				),
			},
			{
				accessorKey: "sold",
				header: () => <>Total Sales</>,
				cell: ({ getValue }) => (
					<>{(getValue() as number).toLocaleString("en-US")}</>
				),
			},
			{
				accessorKey: "quantity",
				header: () => <>Stock</>,
				cell: ({ getValue }) => (
					<>{(getValue() as number).toLocaleString("en-US")}</>
				),
			},
			{
				accessorKey: "vendorId",
				header: () => <>Status</>,
				cell: ({ getValue }) => (
					<div
						className={`flex ${
							getValue() === "instock"
								? "text-green-500/90"
								: "text-red-500/90"
						} items-center space-x-2`}
					>
						{getValue() === "instock" ? (
							<>
								<span className="p-1 rounded-full bg-green-500/40" />
								<span>In Stock</span>
							</>
						) : (
							<>
								<span className="p-1 rounded-full bg-red-500/40" />
								<span>In Stock</span>
							</>
						)}
					</div>
				),
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
								<FaEye />
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
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Content>
			<Header
				headerTitle={"Best Selling Products"}
				rightComponent={
					<div className="flex text-xs justify-between items-center space-x-1">
						<InputLabel
							getValue={(val) => console.log(val)}
							placeholder="Search"
							inputClassName="p-1 md:w-[50vh]"
							type="search"
							inputsuffixIcon={<MdSearch />}
						/>
						<SelectPicker
							getSelected={(val) => console.log(val)}
							items={["All", "Instock", "Out of stock"]}
							placeholder="Status Type"
							triggerClassName="flex p-[8px] relative top-[5px] items-center space-x-2 border border-afruna-gray/40 [-2 rounded-md"
						/>
						<SelectPicker
							getSelected={(val) => console.log(val)}
							items={[
								"This Month",
								"3 days",
								"1 Week ",
								"3 Weeks",
							]}
							placeholder="Month"
							triggerClassName="flex p-[8px] relative top-[5px] items-center space-x-2 border border-afruna-gray/40 [-2 rounded-md"
						/>
					</div>
				}
			/>
			{data.length ? (
				<table className="w-full relative overflow-auto  border-collapse">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										className="text-left font-semibold p-1 text-afruna-blue text-[12px]"
										key={header.id}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="py-10 px-4 text-afruna-blue">
						{table.getRowModel().rows.map((row) => {
							return (
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
			) : (
				<ResultsFallback/>
			)}
		</Content>
	);
};
