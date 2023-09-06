import { TTabs } from "@/contexts/ProductProvider";
import { IProduct, IProductItem } from "./IProductItem";
import { IProductReview } from "./IProductReview";
import { T_product_reviews } from "@/components/products/ProductReviews";

export interface IProductContext {
	tab: TTabs;
	handleTabSelect: (v: any) => void;
	manageItems?: IProduct[];
	itemsSelector: (item: IProduct) => void;
	product_review?: T_product_reviews;
	handleViewReview: (review: T_product_reviews) => void;
}
