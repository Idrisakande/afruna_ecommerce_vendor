import { ReactElement } from "react";

export interface ISelectPicker {
	getSelected?: (selected: string) => void;
	items?: string[];
	placeholder?: string;
	triggerLeftIcon?: ReactElement;
	contentClassName?: string;
	triggerClassName?: string;
}
