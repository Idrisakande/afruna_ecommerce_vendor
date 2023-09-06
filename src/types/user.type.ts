export type T_InitialUserState = {
	isActive: boolean;
	bio_data: T_User;
	reviews: T_review[] | undefined;
	recent_reviewers: T_user[] | undefined;
	reviewers: T_user[] | undefined;
	revenue_vs_order: {
		daily: [];
		weekly: [];
		monthly: [];
		yearly: [];
	};
	orders: T_order[] |T_updated_order[];
};
export type T_User =
	| {
			_id: string;
			avatar: string;
			email: string;
			firstName: string;
			lastName: string;
			role: string;
			country: string;
			phoneNumber: string;
			followers: string;
			following: string;
			createdAt: string;
			updatedAt: string;
	  }
	| undefined;

export type T_DashboardStats = {
	listedProducts: number;
	totalOrders: number;
	shippedOrders: number;
	canceledOrders: number;
};

export type T_review = {
	_id: string;
	productId: string;
	userId: string;
	comment: string;
	createdAt: string;
	rating: number;
	updatedAt: string;
};

export type T_user = {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	avatar: string;
	country: string;
	phoneNumber: string;
	createdAt: string;
	updatedAt: string;
};

export type T_order = {
	_id: string;
	vendorId: string;
	productId: string;
	sessionId: string;
	isPaid: boolean;
	quantity: number;
	total: number;
	deliveryStatus: string;
	isCanceled: boolean;
	createdAt: string;
	updatedAt: string;
	customId: string;
};
export type T_updated_order = {
	_id: string;
	vendorId: string;
	productId: string;
	sessionId: string;
	isPaid: boolean;
	quantity: number;
	total: number;
	deliveryStatus: string;
	isCanceled: boolean;
	createdAt: string;
	updatedAt: string;
	customId: string;
	coverPhoto: string;
	productName: string;
};
