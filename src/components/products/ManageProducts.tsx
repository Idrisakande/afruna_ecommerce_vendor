/* eslint-disable react/display-name */
import { FC, memo, useContext, useEffect } from "react";
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

export const ManageProducts: FC<{}> = memo(({ }) => {
	const { tab, itemsSelector } = useContext(productcontext) as IProductContext;
	const {products} = useSelector((state:RootState)=> state.products)
	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "flex";
	}, []);


	return (
		<Content>
		{products.length?(<>	<Header
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
							items={["Approved", "Pending", "Cancelled", "Shipped"]}
							placeholder="Action"
							triggerClassName="flex p-[8px] relative top-[5px] items-center space-x-2 border border-afruna-gray/40 [-2 rounded-md"
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
						item.discount?
						((
							item.price -
							(item.discount / 100) * item.price
						).toFixed(2) as unknown as number):(item.price)
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
						checkbox
						handleSelect={() => itemsSelector(item)}
					/>
				))}
				</div></>) : (<div className="flex flex-col justify-center items-center">
					<Image src={images.noResult} alt="no_result" />
					<h1>Nothing Products</h1>
			</div>)}
		</Content>
	);
});
