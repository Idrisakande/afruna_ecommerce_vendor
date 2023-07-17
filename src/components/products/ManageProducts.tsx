/* eslint-disable react/display-name */
import { FC, memo, useContext } from "react";
import { Content } from "./Content";
import { IProductContext } from "@/interfaces/IProductContext";
import { Header } from "./Header";
import { InputLabel } from "../widgets/Input/InputLabel";
import { MdSearch } from "react-icons/md";
import { SelectPicker } from "../widgets/SelectPicker";
import { ProductItem } from "./ProductItem";
import { images } from "@/constants/images";
import { productcontext } from "@/contexts/ProductProvider";

export const ManageProducts: FC<{}> = memo(({}) => {
	const { tab, itemsSelector } = useContext(
		productcontext
	) as IProductContext;
	return (
		<Content>
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
						<SelectPicker
							getSelected={(val) => console.log(val)}
							items={[
								"Approved",
								"Pending",
								"Cancelled",
								"Shipped",
							]}
							placeholder="Action"
							triggerClassName="flex p-[8px] relative top-[5px] items-center space-x-2 border border-afruna-gray/40 [-2 rounded-md"
						/>
					</div>
				}
				headerTitle={tab}
			/>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:-gap-4 p-10 pb-10">
				{[
					{
						published: false,
						date: null,
						item_img: images.product6,
						item_name: "Masashi Status",
						rating: 3.5,
						rated: 4,
						price: 470,
						slashed_price: 160,
						category: "Arts",
						stock: 104,
						order: 74,
					},
					{
						published: true,
						date: new Date().toLocaleString("en-US"),
						item_img: images.product7,
						item_name: "Masashi Status",
						rating: 4.5,
						rated: 4,
						price: 120,
						slashed_price: 160,
						category: "Arts",
						stock: 259,
						order: 210,
					},
					{
						published: false,
						date: null,
						item_img: images.product5,
						item_name: "Masashi Status",
						rating: 4.5,
						rated: 4,
						price: 120,
						slashed_price: 160,
						category: "Arts",
						stock: 259,
						order: 210,
					},
					{
						published: false,
						date: null,
						item_img: images.product3,
						item_name: "Masashi Status",
						rating: 4.5,
						rated: 4,
						price: 120,
						slashed_price: 160,
						category: "Arts",
						stock: 259,
						order: 210,
						discount: 40,
					},
				].map((item, _) => (
					<ProductItem
						{...item}
						key={_}
						checkbox
						handleSelect={() => itemsSelector(item)}
					/>
				))}
			</div>
		</Content>
	);
});
