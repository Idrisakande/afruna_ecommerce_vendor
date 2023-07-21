import { StaticImageData } from "next/image";

export interface IReview {
	img: StaticImageData;
	rated: number;
	name: string;
	date: Date;
	comment: string;
}
