import { T_convo, T_msg } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const Chat = createSlice({
	name: "Chat",
	initialState: {convo:[],messages:[]} as {
		convo: T_convo[];
		messages: T_msg[];
	},
	reducers: {
		updateConvo(state, action: PayloadAction<T_convo[]>) {
			state.convo = action.payload;
		},
		updateMessages(state, action: PayloadAction<T_msg[]>) {
			state.messages = action.payload;
		},
	},
});
export const { updateConvo, updateMessages } = Chat.actions;
export default Chat.reducer;