import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProducts {}

const Products = createSlice({
	name: "Products",
	initialState: {} as IProducts,
	reducers: {},
});

export default Products.reducer;
