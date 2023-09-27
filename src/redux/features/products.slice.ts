import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/IProductItem";

const Products = createSlice({
	name: "Products",
	initialState: { products: [] } as {
		products: IProduct[];
	},
	reducers: {
		updateProducts(state, action: PayloadAction<IProduct[]>) {
			state.products = action.payload;
		},
	},
});

export const { updateProducts } = Products.actions;
export default Products.reducer;
