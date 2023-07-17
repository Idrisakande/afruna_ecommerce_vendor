import { StaticImageData } from "next/image";
import { ChangeEvent, ReactElement } from "react";

export interface IProductItem {
	published?: boolean;
	date?: Date | string | null;
	item_img: StaticImageData;
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
}
