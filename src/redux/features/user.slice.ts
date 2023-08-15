import { T_InitialUserState, T_User } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const User = createSlice({
	initialState: {
		isActive: false,
		bio_data: {
			_id: "",
			email: undefined,
			country: undefined,
			lastName: undefined,
			firstName: undefined,
			phoneNumber: undefined,
		},
	} as T_InitialUserState,
	name: "User",
	reducers: {
		updateUserActiveness(state, action: PayloadAction<boolean>) {
			state.isActive = action.payload;
		},
		setUserBio(state, action: PayloadAction<T_User>) {
			state.bio_data = action.payload;
		},
	},
});

export const { setUserBio, updateUserActiveness } = User.actions;
export default User.reducer;
