import { StaticImageData } from "next/image";

export interface IProductReview {
	id: number;
	name: string;
	category: string;
	status: string;
	image: StaticImageData;
}
