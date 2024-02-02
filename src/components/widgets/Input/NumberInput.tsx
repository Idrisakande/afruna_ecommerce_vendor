import React, { FC, InputHTMLAttributes } from "react";

interface INumberProps extends InputHTMLAttributes<HTMLInputElement> {}

const NumberInput: FC<INumberProps> = ({ ...rest }) => {
	const removeSpecialCharacters: React.KeyboardEventHandler<
		HTMLInputElement
	> = (e) => {
		// Assert the type of e.target to HTMLInputElement
		const target = e.target as HTMLInputElement;

		// Replacing numbers other than 0-9
		target.value = target.value.replace(/[^0-9 ]/g, "");
		// Removing special characters
		target.value = target.value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
	};

	const checkLength: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		const KEYS = {
			leftKey: 37,
			rightKey: 39,
			backspace: 8,
			deleteKey: 46,
			digitZero: 48,
			digitNine: 57,
		};

		// Assert the type of e.target to HTMLInputElement
		const target = e.target as HTMLInputElement;

		if (
			e.keyCode === KEYS.backspace ||
			e.keyCode === KEYS.deleteKey ||
			e.keyCode === KEYS.rightKey ||
			e.keyCode === KEYS.leftKey
		) {
			return true;
		}

		if (
			e.keyCode < KEYS.digitZero ||
			e.keyCode > KEYS.digitNine ||
			target.value.length === rest.maxLength || // Use rest.maxLength directly
			e.shiftKey
		) {
			e.stopPropagation();
			e.preventDefault();
			return false;
		}

		return true;
	};

	return (
		<input
			type="text"
			onKeyDown={checkLength}
			onKeyUp={removeSpecialCharacters}
			{...rest}
		/>
	);
};

export default NumberInput;
