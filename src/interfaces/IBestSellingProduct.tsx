import { StaticImageData } from "next/image";

export interface IBestSellingProduct {
	id: number;
	image: StaticImageData;
	name: string;
	price: number;
	total_sales: number;
	stock: number;
	status: string;
}
