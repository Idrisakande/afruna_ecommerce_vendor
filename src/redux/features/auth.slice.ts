import { T_initial_state } from "@/types/auth.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
	initialState: { isAuthenticated: false } as T_initial_state,
	name: "AUTH",
	reducers: {
		setAuth10(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setToken(state, action: PayloadAction<string | undefined>) {
			state.token = action.payload;
		},
	},
});

export const { setAuth10, setToken } = Auth.actions;
export default Auth.reducer;
