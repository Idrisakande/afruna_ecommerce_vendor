import { StaticImageData } from "next/image";
import { ChangeEvent, ReactElement } from "react";

export interface IProductItem {
	published?: boolean;
	date?: Date | string | null;
	item_img?: string;
	item_name: string;
	rated: number;
	rating?: number;
	price: number;
	slashed_price: number;
	category?: string;
	stock?: number;
	order?: number;
	discount?: number;
	checkbox?: boolean;
	handleSelect?: () => void;
	onClick?: () => void;
}
export interface IProduct {
	_id: string;
	name: string;
	desc: string;
	quantity: number;
	categoryId: string;
	price: number;
	discount: number;
	images: string[];
	color: string;
	coverPhoto: string;
	size: string;
	condition: string;
	brand: string;
	metaData: string[];
	deliveryLocations: string[];
	sold: boolean;
	isOutOfStock: boolean;
	isPromoted: boolean;
	vendorId: string;
	ratings: number;
	ratedBy: number;
	customId: string;
	createdAt?: string;
	updatedAt?: string;
}
