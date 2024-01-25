import { IAuthProps } from "@/interfaces/auth.interface";

export type T_initial_state = {
	isAuthenticated: boolean;
	// token?: string | undefined;
};

// Define the type of the original component
export type TOriginalComponentProps = {
	// Define the props of the original component here
};

// Define the type of the resulting component
export type TResultComponentProps = TOriginalComponentProps & IAuthProps;
export type T_login_data = {
	email: string;
	password: string;
	remember_me?: boolean;
};
export type T_register_data = {
	country: string;
	confirmPassword: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	phoneNumber: string;
};

export type T_UnAuthorized = {
	success: false;
	message: "jwt expired";
	error: {
		name: "TokenExpiredError";
		message: "jwt expired";
		expiredAt: "2023-08-21T14:34:37.000Z";
	};
};

export type T_error_response = {
	success: boolean;
	message: string;
	error: {
		statusCode: number;
		data: [] | string | null;
		message: string;
	};
}
export type TSuccessResponse<X> = {
	success: boolean;
	message: string;
	totalPages: number;
	data: X;
};



export type TUnAuthorized = {
	success: false;
	message: "jwt expired";
	error: {
		name: "TokenExpiredError";
		message: "jwt expired";
		expiredAt: string;
	};
};

export type TErrorResponse = {
	success: boolean;
	message: string;
	error: {
		statusCode: number;
		data: [] | string | null;
		message: string;
	};
};