/* eslint-disable react/display-name */
import { FC, memo, useContext } from "react";
import { MdSearch } from "react-icons/md";
import { InputLabel } from "@/components/widgets/Input/InputLabel";
import { images } from "@/constants/images";
import { SelectPicker } from "@/components/widgets/SelectPicker";
import { ProductItem } from "@/components/products/ProductItem";
import { IProductContext } from "@/interfaces/IProductContext";
import { Header } from "./Header";
import { Content } from "./Content";
import { productcontext } from "@/contexts/ProductProvider";

export const ProductList: FC<{}> = memo(({}) => {
	const { tab } = useContext(productcontext) as IProductContext;
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
				{[
					{
						published: false,
						date: null,
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
						item_img: images.product7,
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
					<ProductItem key={_} {...item} />
				))}
			</div>
		</Content>
	);
});
