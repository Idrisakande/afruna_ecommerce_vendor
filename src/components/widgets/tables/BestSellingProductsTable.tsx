import { useLayoutEffect, useMemo, useState } from "react";
import { MdDeleteOutline, MdRemoveRedEye, MdSearch } from "react-icons/md";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as Select from "@radix-ui/react-select";

import { InputLabel } from "@/components/widgets/Input/InputLabel";
import { SelectPicker } from "@/components/widgets/SelectPicker";
import { Header } from "@/components/products/Header";
import { Content } from "@/components/products/Content";
import { FaEye } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import { IBestSellingProduct } from "@/interfaces/IBestSellingProduct";
import { images } from "@/constants/images";
import { dateInterval, products, sortType } from "@/constants/data";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { IProduct } from "@/interfaces/IProductItem";
import { ResultsFallback } from "../ResultsFallback";
import useSearchProducts from "@/hooks/useSerchProducts";
import { GoSearch } from "react-icons/go";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectItem } from "../SelectItem";
import Products from "@/services/products.service";
import Link from "next/link";
import { verifyImageUrl } from "@/utils/verify_image_url";

export const BestSellingProductsTable = () => {
	useLayoutEffect(() => {
		const productService = new Products();
	
	},[])
	const { products } = useSelector((state: RootState) => state.products);
	const { searchInput,searchResult,setSearchInput,setSortingType,setTimePeriod,sortingType} = useSearchProducts({data: products,period: "all"});
	const [data, setData] = useState(searchResult);
	const columns = useMemo<ColumnDef<IProduct>[]>(
		() => [
			{
				accessorKey: "customId",
				header: () => <>Product Id</>,
				cell: ({ getValue }) => <>{getValue()}</>,
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
						src={verifyImageUrl(row.original.coverPhoto[0])??images.afruna_logo}
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
							<Link
							href={"/products/"+row.original._id}
							className="hover:scale-90 border-none transition duration-300"
						>
							<MdRemoveRedEye size={24} />
						</Link>
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
					<div className="grid grid-cols-4 space-x-1">
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
								<Select.Trigger className="flex md:col-span-1 items-center gap-2 p-3 border rounded-lg">
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
							<Select.Root onValueChange={setSortingType as (value: string) => void}>
								<Select.Trigger className="flex md:col-span-1 items-center gap-2 p-3 border rounded-lg">
									<Select.Value
										placeholder={"Sorting"}
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
											{sortType.map((date) => (
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
