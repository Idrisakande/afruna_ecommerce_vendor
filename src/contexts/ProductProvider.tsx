import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { CreateBtn } from "@/components/widgets/CreateBtn";
import { Main } from "@/layouts/Main";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
import { MdAdd } from "react-icons/md";
import { IProductItem } from "@/interfaces/IProductItem";
import { IProductContext } from "@/interfaces/IProductContext";
import { IProductReview } from "@/interfaces/IProductReview";

export type TTabs =
	| "Product Listing"
	| "Manage Products"
	| "Create New Product"
	| "Product Reviews";

export const productcontext = createContext<IProductContext | null>(null);

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [tab, setTab] = useState<TTabs>("Product Listing");
	const handleTabSelect = useCallback((tab: TTabs) => setTab(tab), []);
	const [manageItems, setManageItems] = useState<IProductItem[]>([]);
	const [product_review, setProductReview] = useState<IProductReview>();
	const handleViewReview = useCallback(
		(review: IProductReview) => setProductReview(review),
		[]
	);

	console.log(product_review);

	const itemsSelector = useCallback(
		(item: IProductItem) => {
			let itemExist = manageItems.some(
				(pair) => pair.item_img === item.item_img
			);
			if (itemExist) {
				setManageItems(
					manageItems.filter(
						(pair) => pair.item_img !== item.item_img
					)
				);
			} else {
				setManageItems([...manageItems, item]);
			}
		},
		[manageItems]
	);

	return (
		<productcontext.Provider
			value={{
				manageItems,
				tab,
				handleTabSelect,
				itemsSelector,
				product_review,
				handleViewReview,
			}}
		>
			<Main
				breadcrumbs={<Breadcrumbs />}
				asideComponent={
					<CreateBtn
						placeholder="Create Product"
						prefixIcon={<MdAdd />}
					/>
				}
			>
				{children}
			</Main>
		</productcontext.Provider>
	);
};
