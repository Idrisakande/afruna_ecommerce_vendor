import Cookies from 'js-cookie';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { T_initial_state } from "@/types/auth.type";

const Auth = createSlice({
	initialState: { isAuthenticated: false } as T_initial_state,
	name: "AUTH",
	reducers: {
		setAuth10(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setToken(_, action: PayloadAction<string>) {
			Cookies.set("token", action.payload,{expires: 3})
		},
	},
});

export const { setAuth10, setToken } = Auth.actions;
export default Auth.reducer;
