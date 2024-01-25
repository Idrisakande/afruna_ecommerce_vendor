
export type { IProduct } from "./IProductItem";
export interface IUser {
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
}

export interface IOrder {
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
}