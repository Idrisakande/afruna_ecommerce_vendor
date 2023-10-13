/* eslint-disable react/display-name */
import { FC, memo, useContext, useEffect} from "react";
import { MdSearch } from "react-icons/md";
import { InputLabel } from "@/components/widgets/Input/InputLabel";
import { images } from "@/constants/images";
import { SelectPicker } from "@/components/widgets/SelectPicker";
import { ProductItem } from "@/components/products/ProductItem";
import { IProductContext } from "@/interfaces/IProductContext";
import { Header } from "./Header";
import { Content } from "./Content";
import { productcontext } from "@/contexts/ProductProvider";
import Products from "@/services/products.service";
import PageLoarder from "../widgets/PageLoarder";
import Image from "next/image";
import { useSelector } from "react-redux";
import * as Select from "@radix-ui/react-select";
import axios from "axios";

import { RootState } from "@/types/store.type";
import useSearchProducts from "@/hooks/useSerchProducts";
import { GoSearch } from "react-icons/go";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { dateInterval, sortType } from "@/constants/data";
import { SelectItem } from "../widgets/SelectItem";
import { ResultsFallback } from "../widgets/ResultsFallback";
// import { AppContext } from "@/contexts/AppProvider";
// import { T_app_provider } from "@/types/t";

export const ProductList: FC<{}> = memo(({}) => {
	const { tab } = useContext(productcontext) as IProductContext;
	// const { isLoading, setIsloading } = useContext(
	// 	AppContext,
	// ) as T_app_provider;
	const { products } = useSelector((state: RootState) => state.products);

	const {searchInput,searchResult,setSearchInput,setSortingType,setTimePeriod } = useSearchProducts({data: products,period: "all"});

	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "flex";
	}, []);

	return (
		<Content>
			<Header
				headerTitle={tab}
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

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:-gap-4 p-10 pb-10">
				{searchResult.length ? (
					searchResult.map((item, _) => (
						<ProductItem
							key={_}
							item_img={item.coverPhoto[0] ?? ""}
							item_name={item.name}
							price={
								item.discount?
								((
									item.price -
									(item.discount / 100) * item.price
								).toLocaleString() as unknown as number):(item.price.toLocaleString()as unknown as number)
							}
							rated={item.ratedBy}
							slashed_price={item.discount?item.price:0}
							category={item.categoryId}
							date={item.createdAt}
							discount={item.discount}
							order={item.quantity}
							rating={item.ratings}
							stock={item.quantity}
							published={item.isPromoted}
						/>
					))
				) : (
					<ResultsFallback/>
				)}
			</div>
		</Content>
	);
});
