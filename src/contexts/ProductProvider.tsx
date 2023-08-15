import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { CreateBtn } from "@/components/widgets/CreateBtn";
import { Main } from "@/layouts/Main";
import {
	FC,
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import { MdAdd } from "react-icons/md";
import { IProductItem } from "@/interfaces/IProductItem";
import { IProductContext } from "@/interfaces/IProductContext";
import { IProductReview } from "@/interfaces/IProductReview";
import Products from "@/services/products.service";

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
		[],
	);
	useEffect(() => {
		(async () => {
			const productsService = new Products();
			const products = await productsService.createProduct({
				name: "Mashamallow Cakes",
				desc: "Food is good for your body especially this.",
				size: "sm",
				sold: false,
				brand: "Fanr Sweeten Inc",
				color: "Blue",
				images: [""],
				ratedBy: 48483,
				ratings: 47432,
				customId: "445",
				discount: 44,
				metaData: ["Calories"],
				quantity: 394,
				vendorId: "42",
				condition: "90% New",
				categoryId: "484",
				isPromoted: true,
				isOutOfStock: false,
				deliveryLocations: ["NG"],
				price: 9422,
			});
			console.log(products);
		})();
	}, []);

	const itemsSelector = useCallback(
		(item: IProductItem) => {
			let itemExist = manageItems.some(
				(pair) => pair.item_img === item.item_img,
			);
			if (itemExist) {
				setManageItems(
					manageItems.filter(
						(pair) => pair.item_img !== item.item_img,
					),
				);
			} else {
				setManageItems([...manageItems, item]);
			}
		},
		[manageItems],
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
