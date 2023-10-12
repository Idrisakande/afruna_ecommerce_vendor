import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/IProductItem";
import { T_review } from "@/types/user.type";

const Products = createSlice({
	name: "Products",
	initialState: { products: [],productsWithReviews:[] } as {
		products: IProduct[];
		productsWithReviews: (IProduct & { reviews: T_review[] })[],
	},
	reducers: {
		updateProducts(state, action: PayloadAction<IProduct[]>) {
			state.products = action.payload;
		},
		updateProdouctsWithReviews(state, action: PayloadAction<(IProduct & { reviews: T_review[] })[]>) {
			state.productsWithReviews = action.payload;
		}
	},
});

export const { updateProducts,updateProdouctsWithReviews } = Products.actions;
export default Products.reducer;
