import { updateConvo, updateMessages } from "@/redux/features/chat.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { T_store } from "@/types/store.type";
import { T_msg } from "@/types/user.type";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

class Chat {
	protected store!: T_store;
	constructor() {
		this.store = store.store;
		this.getConversations();
	}
	async getConversations() {
		try {
			const { data } = await axios.get("/api/conversations", {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			this.store.dispatch(updateConvo(data.data));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	async getMessage(id: string) {
		try {
			const { data } = await axios.get("/api/messages/" + id, {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			// Reverse the order of chat messages to show the last one at the top
			const messages: T_msg[] = data.data.slice().reverse();
			this.getConversations();
			this.store.dispatch(updateMessages(messages));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	async sendMessage(payload: { to: string; message: string }) {
		try {
			const { data } = await axios.post("/api/messages/", payload, {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			const id = data.data.message.conversation;
			console.log(id);
			this.getMessage(id);
			this.getConversations();
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
}
export default Chat;
