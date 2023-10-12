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

export const ManageProducts: FC<{}> = memo(({}) => {
	const { tab, itemsSelector, manageItems } = useContext(
		productcontext,
	) as IProductContext;
	const { products } = useSelector((state: RootState) => state.products);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [action, setAction] = useState<string>();
	const [idArrays, setIdarrays] = useState<string[]>([])
	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "flex";
	}, []);

	const handleSelectAction = useCallback(
		(val: string) => {
			setAction(val as string);
			if (action === "Delete") {
				setShowModal(true);
			} else {
				setShowEditModal(true)
			}
		},
		[action],
	);
	useEffect(() => {
	  const arrayId = manageItems?.map((item) => item._id)
	  arrayId ? setIdarrays(arrayId): null
	  console.log(idArrays);
	  
	}, [manageItems])

	const deleteproducts = useCallback(() => {}, []);

	return (
		<>
			<PopupModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			/>
			<EditModal
				isOpen={showEditModal}
				onClose={() => setShowEditModal(false)}
			/>
			<Content>
				{products.length ? (
					<>
						{" "}
						<Header
							rightComponent={
								<div className="flex text-xs justify-between items-center space-x-1">
									<InputLabel
										getValue={(val) => console.log(val)}
										placeholder="Search"
										inputClassName="p-1 md:w-[50vh]"
										type="search"
										inputsuffixIcon={<MdSearch />}
									/>
									<ItemLabelPicker
										items={["Edit", "Delete"]}
										placeholder="Action"
										key={"Items"}
										contentClassName=""
										triggerClassName="flex text-sm space-x-1 items-center text-afruna-blue border w-full max-w-[8rem] border-afruna-gray/30 px-2 py-2 rounded-md"
										getSelected={(val) =>
											handleSelectAction(val)
										}
									/>
								</div>
							}
							headerTitle={tab}
						/>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:-gap-4 p-10 pb-10">
							{products.map((item, _) => (
								<ProductItem
									item_img={item.coverPhoto[0] ?? ""}
									item_name={item.name}
									price={
										item.discount
											? ((
													item.price -
													(item.discount / 100) *
														item.price
											  ).toLocaleString() as unknown as number)
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
					<div className="flex flex-col justify-center items-center">
						<Image src={images.noResult} alt="no_result" />
						<h1>Nothing Products</h1>
					</div>
				)}
			</Content>
		</>
	);
});
