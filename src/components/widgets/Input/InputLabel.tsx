import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import { IInputLabel } from "@/interfaces/inputs.interfaces";

export function InputLabel({
	headerTitle,
	getValue,
	placeholder,
	type,
	inputClassName,
	inputprefixIcon,
	inputsuffixIcon,
}: IInputLabel) {
	const [input, setInput] = useState<string | number | undefined>();
	const inputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
		[]
	);
	const inputRef = useRef<HTMLInputElement>(null);
	useMemo(() => getValue(input), [getValue, input]);
	return (
		<fieldset>
			<h3 className="my-2">{headerTitle}</h3>
			<div className="w-full flex justify-between space-x-1 items-center border-[1px] border-slate-300 p-1 px-3 rounded-md">
				{inputprefixIcon && inputprefixIcon}
				<input
					ref={inputRef}
					onChange={inputChange}
					value={inputRef.current?.value}
					type={type}
					placeholder={placeholder}
					className={classnames("", inputClassName)}
				/>
				{inputsuffixIcon && inputsuffixIcon}
			</div>
		</fieldset>
	);
}
