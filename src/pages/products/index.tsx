/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { createContext, memo, useContext, useMemo } from "react";

import {
	ProductProvider,
	TTabs,
	productcontext,
} from "@/contexts/ProductProvider";
import { ProductList } from "@/components/products/ProductList";
import { ManageProducts } from "@/components/products/ManageProducts";
import { CreateProduct } from "@/components/products/CreateProduct";
import { IProductContext } from "@/interfaces/IProductContext";
import { ProductReviews } from "@/components/products/ProductReviews";

const TABS = [
	"Product Listing",
	"Manage Products",
	"Create New Product",
	"Product Reviews",
];

const Index = () => {
	return (
		<ProductProvider>
			<CurrentProductTab />
		</ProductProvider>
	);
};

export default Index;

const CurrentProductTab = memo(() => {
	const { tab, handleTabSelect } = useContext(
		productcontext,
	) as IProductContext;
	const Component = useMemo(() => {
		switch (tab) {
			case "Create New Product":
				return <CreateProduct />;
			case "Manage Products":
				return <ManageProducts />;
			case "Product Reviews":
				return <ProductReviews />;

			default:
				return <ProductList />;
		}
	}, [ProductList, tab]);

	return (
		<>
			<div className="flex items-center space-x-8 p-3 m-3">
				{TABS.map((item, idx) => (
					<button
						className={`${
							tab === item &&
							"text-afruna-gold/50 border-b border-b-afruna-gold/50"
						} text-afruna-blue text-[12px] md:text-xs font-bold `}
						key={idx}
						onClick={() =>
							handleTabSelect(item as unknown as TTabs)
						}
					>
						{item}
					</button>
				))}
			</div>
			<Component.type />
		</>
	);
});
