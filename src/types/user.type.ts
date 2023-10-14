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
	users: T_User[],
	usersWithReviews: (T_User & { reviews: T_review[] })[];
	orders: T_order[];
	orderBySessionId: T_orderBySessionId[];
	orderBuyerInfo: T_User | undefined;
	reports: T_reports | undefined;
	viewOrder: T_order | T_user_order | T_updated_user_order | undefined;
};
export type T_orderBySessionId = {
	_id: string;
	vendorId: string;
	productId: {
		_id: string;
		name: string;
		images: string[];
	};
	sessionId: string;
	isPaid: boolean;
	quantity: number;
	total: number;
	deliveryStatus: string;
	isCanceled: boolean;
	options: any[];
	createdAt: string;
	updatedAt: string;
	customId: string;
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
			blocked?: boolean;
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
	userId: {
		_id: string;
		firstName: string;
		lastName: string;
		avatar: string;
	};
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
export type T_user_order = {
	_id: string;
	userId: string;
	total: number;
	createdAt: string;
	updatedAt: string;
	customId: string;
	items: T_order[];
};

export type T_order = {
	_id: string;
	vendorId: string;
	productId: {
		_id: string;
		name: string;
		images: string[];
	};
	sessionId: string;
	isPaid: boolean;
	quantity: number;
	total: number;
	deliveryStatus: string;
	isCanceled: boolean;
	options: any[];
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
export type T_updated_user_order = T_user_order & {
	coverPhoto: string;
	productName: string;
};

export type T_reports = {
	order: {
		today: number;
		yesterdayPercentage: number | null;
	};
	revenue: {
		today: number;
		yesterdayPercentage: number | null;
	};
	visitors: number;
};

export type T_convo = {
	_id: string;
	recipients: string[];
	lastMessage: string;
	alias: string;
	aliasAvatar: string;
	unreadMessages: number;
	createdAt: string;
	updatedAt: string;
};

export type T_msg = {
	_id: string;
	conversation: string;
	to: T_msg_alias;
	from: T_msg_alias;
	message: string;
	attachment: [];
	seen: string[];
	createdAt: string;
	updatedAt: string;
};

export type T_msg_alias = {
	_id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	country: string;
	email: string;
	password: string;
	role: string;
	verificationToken: string;
	isVendor: boolean;
	addresses: [];
	createdAt: string;
	updatedAt: string;
	avatar: string;
};
