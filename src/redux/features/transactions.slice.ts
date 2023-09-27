import { PayloadAction, createSlice } from "@reduxjs/toolkit"
const Transactions = createSlice({
	name: "Transactions",
    initialState: {transactions: [{}]} as {transactions: any[]},
	reducers: {
		updateTransactions(state, action: PayloadAction<any[]>) {
			state.transactions = action.payload;
		},
	},
});

export const { updateTransactions } = Transactions.actions;
export default Transactions.reducer;
