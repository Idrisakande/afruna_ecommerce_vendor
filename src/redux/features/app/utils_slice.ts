import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalPages: 0
}

const utilSlice = createSlice({
    name: 'Util_Slice',
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        
    }
})

export const { setTotalPages } = utilSlice.actions;
export default utilSlice.reducer;