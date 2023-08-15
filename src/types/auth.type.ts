import { IAuthProps } from "@/interfaces/auth.interface";

export type T_initial_state = {
	isAuthenticated: boolean;
	token?: string | undefined;
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
