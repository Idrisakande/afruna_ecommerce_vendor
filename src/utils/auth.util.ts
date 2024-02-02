import { T_error_response } from "@/types/auth.type";
import { AxiosError, isAxiosError } from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

export function handleAuthErrors(error: AxiosError<T_error_response>) {
	if (isAxiosError(error)) {
		if (error.response) {
			toast.warning("Oops! Incorrect login details" as string, {
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
		toast.warn("Uh-oh, seems like there's a hiccup in the connection.", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
		return error;
	}
}
export function handleTransactionErrors(error: AxiosError<T_error_response>) {
	if (isAxiosError(error)) {
		if (error.response) {
			if (
				error.response.data.message === "jwt expired" ||
				error.response.data.message === "jwt malformed"
			) {
				let router = Router;
				toast.warning(
					"Oops! Your session might have expired. Refresh and try again." as string,
					{
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					},
				);
			}
			//successful request with server response.
			else return error.response.data;
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
		toast.warn("Uh-oh, seems like there's a hiccup in the connection.", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
		return error;
	}
}
