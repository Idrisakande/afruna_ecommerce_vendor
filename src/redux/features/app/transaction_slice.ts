import { IBank, ITransaction, IWallet } from "@/interfaces/ITransaction";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [] as ITransaction[],
    transaction: {} as ITransaction,
    banks: [] as IBank[],
    wallet: {} as IWallet
}

const transaction_slice = createSlice({
    name: "Transaction_Slice",
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
            state.transactions = action.payload
        },
        setSingleTransaction: (state, action: PayloadAction<ITransaction>) => {
            state.transaction = action.payload
        },
        setBanks: (state, action: PayloadAction<IBank[]>) => {
            state.banks = action.payload
        },
        setWallet: (state, action: PayloadAction<IWallet>) => {
            state.wallet = action.payload
        }
    }
})

export const { setTransactions, setSingleTransaction, setBanks, setWallet } = transaction_slice.actions
export default transaction_slice.reducer