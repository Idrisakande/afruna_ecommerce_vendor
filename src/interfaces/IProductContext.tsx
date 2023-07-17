import { TTabs } from "@/contexts/ProductProvider";
import { IProductItem } from "./IProductItem";
import { IProductReview } from "./IProductReview";

export interface IProductContext {
	tab: TTabs;
	handleTabSelect: (v: any) => void;
	manageItems?: IProductItem[];
	itemsSelector: (item: IProductItem) => void;
	product_review?: IProductReview;
	handleViewReview: (review: IProductReview) => void;
}
