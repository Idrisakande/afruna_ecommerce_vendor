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
import axios from "axios";

import { RootState } from "@/types/store.type";
// import { AppContext } from "@/contexts/AppProvider";
// import { T_app_provider } from "@/types/t";

export const ProductList: FC<{}> = memo(({}) => {
	const { tab } = useContext(productcontext) as IProductContext;
	// const { isLoading, setIsloading } = useContext(
	// 	AppContext,
	// ) as T_app_provider;
	const { products } = useSelector((state: RootState) => state.products);

	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "flex";
	}, []);
	/* useEffect(() => {
		const _ = new Products({ isLoading, setIsloading });
	}, []); */

	// if (isLoading) return <PageLoarder />;

	return (
		<Content>
			<Header
				headerTitle={tab}
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
							items={[
								"Approved",
								"Pending",
								"Cancelled",
								"Shipped",
							]}
							placeholder="Select"
							triggerClassName="flex p-[8px] relative top-[5px] items-center space-x-2 border border-afruna-gray/40 [-2 rounded-md"
						/>
						<SelectPicker
							getSelected={(val) => console.log(val)}
							items={["This Month"]}
							placeholder="Select"
							triggerClassName="flex p-[8px] relative top-[5px] items-center space-x-2 border border-afruna-gray/40 [-2 rounded-md"
						/>
					</div>
				}
			/>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:-gap-4 p-10 pb-10">
				{products.length ? (
					products.map((item, _) => (
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
					<Image
						src={images.noResult}
						alt="No result"
						className="w-full place-self-center center"
					/>
				)}
			</div>
		</Content>
	);
});
