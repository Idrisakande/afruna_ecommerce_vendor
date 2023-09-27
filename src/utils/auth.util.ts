import { T_error_response } from "@/types/auth.type";
import { AxiosError, isAxiosError } from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export function handleAuthErrors(error: AxiosError<T_error_response>) {
	if (isAxiosError(error)) {
		if (error.response) {
			if (
				error.response.data.message === "jwt expired" ||
				error.response.data.message === "jwt malformed"
			) {
				let router = Router;
				router.replace("/auth/login");
			}
			//successful request with server response.
			else
				toast.error(error.response.data.message as string, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			return error.response.data;
		} else if (error.request) {
			// request made but no server response
			toast.warn("Sorry! Something happened with us", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			return error.request;
		} else {
			return error;
		}
	} else {
		/* toast.error("Make sure you have an active internet connection!", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		}); */
		return error;
	}
}
