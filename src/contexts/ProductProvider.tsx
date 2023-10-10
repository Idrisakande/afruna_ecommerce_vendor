import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useState,
} from "react";
import { MdAdd } from "react-icons/md";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { CreateBtn } from "@/components/widgets/CreateBtn";
import { Main } from "@/layouts/Main";
import { IProduct, IProductItem } from "@/interfaces/IProductItem";
import { IProductContext } from "@/interfaces/IProductContext";
import { IProductReview } from "@/interfaces/IProductReview";
import { T_product_reviews } from "@/components/products/ProductReviews";

export type TTabs =
	| "Product Listing"
	| "Manage Products"
	| "Create New Product"
	| "Product Reviews";

export const productcontext = createContext<IProductContext | null>(null);

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [tab, setTab] = useState<TTabs>("Product Listing");
	const handleTabSelect = useCallback((tab: TTabs) => setTab(tab), []);
	const [manageItems, setManageItems] = useState<IProduct[]>([]);
	const [product_review, setProductReview] = useState<T_product_reviews>();
	const handleViewReview = useCallback(
		(review: T_product_reviews) => setProductReview(review),
		[],
	);
	
	const itemsSelector = useCallback(
		(item: IProduct) => {
			let itemExist = manageItems.some(
				(pair) => pair._id === item._id,
			);
			if (itemExist) {
				setManageItems(
					manageItems.filter(
						(pair) => pair.coverPhoto[0] !== item.coverPhoto[0],
					),
				);
			} else {
				setManageItems([...manageItems, item]);
			}
		},
		[manageItems],
	);
	// let itemExist = manageItems.some(
	// 	(pair) => pair._id === item._id,
	// );
	// const  newItem = manageItems.find(
	// 	(pair) => pair._id === item._id,
	// );
	// if (itemExist) {
	// 	setManageItems([...manageItems]);
	// } else {
	// 	if (newItem) {
	//  manageItems.push(newItem)
	// 	setManageItems([...manageItems])
	// 	}
	// }

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
						createProduct={() => {
							handleTabSelect("Create New Product");
						}}
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
