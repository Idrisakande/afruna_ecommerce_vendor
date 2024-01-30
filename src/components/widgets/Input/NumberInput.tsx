import React, { useRef, useEffect, ChangeEventHandler } from "react";
import { InputHTMLAttributes } from "react";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const NumberInput: React.FC<NumberInputProps> = ({ onChange, ...rest }) => {
	const numRef = useRef<HTMLInputElement>(null);

	// Function to handle change events
	const handleChange = () => {
		if (!numRef.current) return;
		const value = numRef.current.value.trim(); // Remove leading/trailing spaces
		if (!isNaN(Number(value)) && Number(value) >= 0) {
            numRef.current.value = value;
		}
	};

	// Add event listeners
	useEffect(() => {
		if (!numRef.current) return;
		numRef.current.addEventListener("input", handleChange);
		return () => {
			if (!numRef.current) return;
			numRef.current.removeEventListener("input", handleChange);
		};
	}, []);

	return <input ref={numRef} type="number" min="0" {...rest} />;
};

export default NumberInput;
