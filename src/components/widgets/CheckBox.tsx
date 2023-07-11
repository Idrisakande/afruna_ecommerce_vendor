import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
// import './styles.css';

export const CheckBox = () => {
	return (
		<form className="mt-2 border border-blue-600 rounded">
			<Checkbox.Root
				className="bg-white hover:bg-white/70 cursor-pointer w-4 h-4 rounded flex justify-center items-center"
				defaultChecked
				id="c1"
			>
				<Checkbox.Indicator>
					<CheckIcon className="text-blue-700" />
				</Checkbox.Indicator>
			</Checkbox.Root>
		</form>
	);
};
