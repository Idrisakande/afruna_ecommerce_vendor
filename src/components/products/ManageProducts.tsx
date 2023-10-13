/* eslint-disable react/display-name */
import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { Content } from "./Content";
import { IProductContext } from "@/interfaces/IProductContext";
import { Header } from "./Header";
import { InputLabel } from "../widgets/Input/InputLabel";
import { MdSearch } from "react-icons/md";
import { SelectPicker } from "../widgets/SelectPicker";
import { ProductItem } from "./ProductItem";
import { images } from "@/constants/images";
import { productcontext } from "@/contexts/ProductProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import Image from "next/image";
import { PopupModal } from "../PopupModal";
import ItemLabelPicker from "../widgets/ItemLabelPicker";
import { EditModal } from "../EditModal";
import * as Select from "@radix-ui/react-select";
import useSearchProducts from "@/hooks/useSerchProducts";
import { GoSearch } from "react-icons/go";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectItem } from "../widgets/SelectItem";
import { dateInterval } from "@/constants/data";
import { ResultsFallback } from "../widgets/ResultsFallback";
import { priceDiscount } from "@/utils/get_price_discount";
import { IProduct } from "@/interfaces";
import Products from "@/services/products.service";

export const ManageProducts: FC<{}> = memo(({}) => {
	const { tab, itemsSelector, manageItems } = useContext(
		productcontext,
	) as IProductContext;
	const { products } = useSelector((state: RootState) => state.products);
	const {searchInput,searchResult,setSearchInput,setTimePeriod} = useSearchProducts({ data: products, period: "all" });

	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [confirmation, setConfirmation] = useState(false);
	const [editConfirmation, setEditConfirmation] = useState(false);
	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "flex";
	}, []);

	const handleActions = useCallback(
		(value: string) => {
			if (manageItems && manageItems.length > 0) {
				if (value.toLowerCase() === "delete") {
				setShowDeleteModal(true)
			} else if (value.toLowerCase() === "edit") {
				
				setShowEditModal(true);
			}
			}
			return
		},
		[manageItems],
	);
	console.log(manageItems);
	console.log(confirmation);
	


	const deleteproducts = useCallback( async () => {
		const productsService = new Products();
		if (manageItems) {
			for (let item of manageItems) { 
			productsService.deleteproduct(item._id);
		}
		}
		return;
		
	}, [manageItems]);

	return (
		<>
			<PopupModal
				comfirmCallback={setConfirmation}
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
			/>
			<EditModal
				product={(manageItems && manageItems[0]) }
				comfirmCallback={setEditConfirmation}
				isOpen={showEditModal}
				onClose={() => setShowEditModal(false)}
			/>
			<Content>
				{products.length ? (
					<>
						{" "}
						<Header
							rightComponent={
								<div className="grid grid-cols-4 space-x-1">
									<fieldset className="xs:col-span-full md:col-span-2 overflow-hidden text-[#777777] border border-slate-300 flex justify-between items-center rounded-xl">
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
<Select.Root onValueChange={handleActions}>
								<Select.Trigger className="flex md:col-span-1 items-center gap-2 p-3 border rounded-lg">
									<Select.Value
										placeholder={"Actions"}
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
											{manageItems && manageItems.length >2? ["Actions","Edit"]: ["Actions","Delete","Edit"].map((date) => (
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
							headerTitle={tab}
						/>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:-gap-4 p-10 pb-10">
							{searchResult.map((item, _) => (
								<ProductItem
									item_img={item.coverPhoto[0] ?? ""}
									item_name={item.name}
									price={
										item.discount
											? priceDiscount(item.price,item.discount).toLocaleString() as unknown as number
											: item.price.toLocaleString()as unknown as number
									}
									rated={item.ratedBy}
									slashed_price={
										item.discount ? item.price : 0
									}
									category={item.categoryId}
									date={item.createdAt}
									discount={item.discount}
									order={item.quantity}
									rating={item.ratings}
									stock={item.quantity}
									published={item.isPromoted}
									checkbox
									handleSelect={() => itemsSelector(item)}
								/>
							))}
						</div>
					</>
				) : (
					<ResultsFallback />
				)}
			</Content>
		</>
	);
});
