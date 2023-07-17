import { ReactElement } from "react";

export interface IOrederInput {
	customerName: string;
	product: string;
	email: string;
	phoneNumber: number;
	orderDate: string;
	deliveryDate: string;
	amount: number;
	paymentMethod: string;
	accountStatus: string;
}
export interface IInputLabel {
	inputsuffixIcon?: ReactElement;
	inputprefixIcon?: ReactElement;
	inputClassName?: string;
	headerTitle?: string;
	getValue: (s: string | number | undefined) => void;
	placeholder: string;
	type: string;
}
export interface IInputLabelNumber {
	headerTitle: string;
	getValue: (s: string | number | undefined) => void;
	placeholder: string;
	max?: number;
	prefix?: boolean;
	suffix?: boolean;
}
export interface IInputMetadata {
	headerTitle: string;
	getMetadata: (s: string[]) => void;
	placeholder: string;
	prefix?: boolean;
}

export interface IUpdateStatusInput {
	status: string;
	date: string;
}

export interface IAddCategoryInput {
	title: string;
	slug: string;
	description: string;
}
