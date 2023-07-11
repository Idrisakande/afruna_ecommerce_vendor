import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { IInputLabel, IInputLabelNumber } from "@/interfaces/inputs.interfaces";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

export function InputLabelNumber({
	headerTitle,
	getValue,
	placeholder,
	prefix,
	suffix,
}: IInputLabelNumber) {
	const [input, setInput] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const inputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let val = parseInt(e.target.value);
		setInput(isNaN(val) ? 0 : val);
	}, []);
	const increment = useCallback(() => {
		if (inputRef.current) {
			let val = parseInt(inputRef.current.value);
			inputRef.current.value = String(isNaN(val) ? 0 + 1 : val + 1);
			setInput(isNaN(val) ? 1 : val + 1);
		}
	}, []);
	const decrement = useCallback(() => {
		if (
			inputRef.current &&
			(inputRef.current.value as unknown as number) >= 1
		) {
			let val = parseInt(inputRef.current.value) - 1;
			inputRef.current.value = String(val);
			setInput(val);
		}
	}, []);
	useMemo(() => getValue(input), [getValue, input]);
	return (
		<fieldset>
			<h3 className="my-2">{headerTitle}</h3>
			<div className="flex justify-between items-center border-[1px] border-slate-300 px-3 rounded-md">
				{prefix && <span>$</span>}
				<input
					ref={inputRef}
					onChange={inputChange}
					value={inputRef.current?.value}
					type="number"
					placeholder={placeholder}
					className="w-full p-3"
				/>
				{suffix ? (
					<div className="flex flex-col items-center">
						<button
							className="relative  p-[5px] top-2"
							onClick={increment}
						>
							<RxChevronUp size={18} />
						</button>
						<button
							className="relative  p-[5px] bottom-2"
							onClick={decrement}
						>
							<RxChevronDown size={18} />
						</button>
					</div>
				) : null}
			</div>
		</fieldset>
	);
}
