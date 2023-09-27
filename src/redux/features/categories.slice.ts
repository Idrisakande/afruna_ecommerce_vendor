import { T_Categories, T_Category } from "@/types/categories.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Categories = createSlice({
	name: "Categories",
	initialState: { categories: [{ _id: "", name: "" }] } as T_Categories,
	reducers: {
		updateCategories(state, action: PayloadAction<T_Category[]>) {
			state.categories = action.payload;
		},
	},
});

export const { updateCategories } = Categories.actions;
export default Categories.reducer;
