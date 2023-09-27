import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { NextRouter } from "next/router";
import Cookies from "js-cookie";

import store from "@/redux/store";
import { setAuth10, setToken } from "@/redux/features/auth.slice";
import {
	T_UnAuthorized,
	T_error_response,
	T_login_data,
	T_register_data,
} from "@/types/auth.type";
import { handleAuthErrors } from "@/utils/auth.util";
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
			const { data } = await axios.post(`/api/signin`, rest);
			const {
				data: { user },
			} = data;
			if (user.role !== "vendor") {
				toast.warn("Vendors Only!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				return;
			}
			dispatch(setAuth10(true));
			dispatch(setToken(data.data.token));
			dispatch(setUserBio(user as T_User));
			this.router && this.router.replace("/dashboard");
			toast.success("Login Successful", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	async handleLogout() {
		this.store.dispatch(setAuth10(false));
		this.router && this.router.replace("/auth/login");
	}
	async handleSignup(user_data: T_register_data) {
		try {
			const { data } = await axios.post("/api/signup/seller", user_data);
			const {
				data: { user },
			} = data;

			this.store.dispatch(setAuth10(true));
			Cookies.set("token", data.data.token)
			this.store.dispatch(setUserBio(user));
			toast.success("Registeration Successful", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			this.router && this.router.replace("/dashboard");
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
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
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
}

export default Auth10;
