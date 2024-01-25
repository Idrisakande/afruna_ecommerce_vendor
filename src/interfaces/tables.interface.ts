import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface IVendors {
	vendor_name: string;
	itm_stock: number;
	balance: number;
	email: string;
	phone: string;
	created_at: string;
	status: string;
}
export interface IRecentOrders {
	id: number;
	image: StaticImageData;
	itm_name: string;
	qty: number;
	order_date: string;
	status: string;
	amount: number;
}

export interface ITransactionHistory {
	id: number;
	summary: string;
	action: string;
	amount: string;
	date: string;
	event: string;
}

export interface IBuyers {
	id: number;
	username: string;
	profile_img: StaticImageData;
	email: string;
	phone: string;
	created_at: string;
	status: string;
}
export interface IBuyerOrder {
	id: number;
	img: StaticImageData;
	itemName: string;
	amount: number;
	quantity: number;
	orderDate: string;
	status: string;
}
export interface IOrder {
	id: number;
	img: StaticImageData;
	buyers_name: string;
	item_name: string;
	amount: number;
	order_date: string;
	delivery_date: string;
	method_of_payment: string;
	delivery_status: string;
}

export interface IOrederContext {
	toggleOrderButton: () => void;
	isOpen: boolean;
}

export interface IProducts {
	id: number;
	productName: string;
	productImg: string|StaticImageData;
	category: string;
	stock: number;
	rating: string;
	price: number;
	order: number;
	dateListed: string;
}

export interface IOrederDetails {
	id: number;
	itemName: string;
	img: StaticImageData;
	quantity: number;
	orderDate: string;
	amount: number;
}
