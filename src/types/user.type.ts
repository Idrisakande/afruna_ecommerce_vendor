export type T_InitialUserState = {
	isActive: boolean;
	bio_data: T_User;
};
export type T_User =
	| {
			_id: string | undefined;
			country: string | undefined;
			email: string | undefined;
			firstName: string | undefined;
			lastName: string | undefined;
			phoneNumber: string | undefined;
	  }
	| undefined;
