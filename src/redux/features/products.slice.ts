import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/IProductItem";
import { T_review } from "@/types/user.type";
import { T_product_reviews } from "@/components/products/ProductReviews";

const Products = createSlice({
	name: "Products",
	initialState: { products: [],productsWithReviews:[] } as {
		products: IProduct[];
		productsWithReviews: T_product_reviews[],
	},
	reducers: {
		updateProducts(state, action: PayloadAction<IProduct[]>) {
			state.products = action.payload;
		},
		updateProdouctsWithReviews(state, action: PayloadAction<T_product_reviews[]>) {
			state.productsWithReviews = action.payload;
		}
	},
});

export const { updateProducts,updateProdouctsWithReviews } = Products.actions;
export default Products.reducer;
