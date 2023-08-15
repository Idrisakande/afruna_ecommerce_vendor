import { AxiosError, isAxiosError } from "axios";

export function handleAuthErrors(error: AxiosError) {
	if (isAxiosError(error)) {
		if (error.response) {
			//successful request with server response.
			console.warn(error.response.data);
		} else if (error.request) {
			// request made but no server response
			console.warn(error.request);
		} else {
			console.error("Erorr:", JSON.stringify(error));
		}
	} else {
		console.warn({
			code: 500,
			description:
				"Something went wrong! \n Please make sure your internet connection is stable.",
			error: JSON.stringify(error),
		});
	}
}
