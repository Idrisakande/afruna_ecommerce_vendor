import axios, { AxiosError } from "axios";
import { setAuth10, setToken } from "@/redux/features/auth.slice";
import store from "@/redux/store";
import { T_login_data, T_register_data } from "@/types/auth.type";
import { handleAuthErrors } from "@/utils/auth.util";
import { NextRouter } from "next/router";
import { T_User } from "@/types/user.type";
import { setUserBio } from "@/redux/features/user.slice";

class Auth10 {
	private store = store.store;
	private router?: NextRouter;
	constructor(router?: NextRouter) {
		this.router = router;
	}
	async handleLogin(user_data: T_login_data) {
		try {
			const { dispatch } = this.store;
			// const remember = user_data.remember_me;
			const { remember_me, ...rest } = user_data;
			const res = await axios.post(`/api/signin`, rest);
			const { data } = res;
			const {
				data: { user },
			} = data;
			dispatch(setAuth10(true));
			dispatch(setToken(data.data.token));
			dispatch(setUserBio(user as T_User));
			this.router && this.router.push("/dashboard");
		} catch (error) {
			handleAuthErrors(error as AxiosError);
		}
	}
	async handleLogout() {
		this.store.dispatch(setAuth10(false));
		this.router && this.router.push("/auth/login");
	}
	async handleSignup(user_data: T_register_data) {
		try {
			const { data } = await axios.post("/api/signup/seller", user_data);
			const {
				data: { user },
			} = data;

			this.store.dispatch(setAuth10(true));
			this.store.dispatch(setToken(data.data.token));
			this.store.dispatch(setUserBio(user));
			this.router && this.router.push("/dashboard");
		} catch (error) {
			handleAuthErrors(error as AxiosError);
		}
	}
	async googlesignin() {
		try {
			const { data } = await axios.get("/api/oAuthUrls");
			const {
				data: { googleLoginUrl },
			} = data;
			const _popover = window.open(
				googleLoginUrl,
				"popupWindow",
				"left=200,top=200,width=600,height=400",
			);
		} catch (error) {
			handleAuthErrors(error as AxiosError);
		}
	}
}

export default Auth10;
