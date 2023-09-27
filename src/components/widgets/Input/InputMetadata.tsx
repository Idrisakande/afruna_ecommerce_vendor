import { useMemo, useRef, useState } from "react";
import { IInputMetadata } from "@/interfaces/inputs.interfaces";

export function InputMetadata({
	getMetadata,
	headerTitle,
	placeholder,
}: IInputMetadata) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [metadata, setMetadata] = useState<string[]>([]);
	useMemo(() => getMetadata(metadata), [getMetadata, metadata]);

	return (
		<div className="my-10 w-full">
			<h3>{headerTitle}</h3>
			<fieldset className="flex flex-wrap items-center mt-2 px-1  border-[1px] border-slate-300 rounded-lg">
				<input
					ref={inputRef}
					type="text"
					className="w-full p-3"
					placeholder={placeholder}
					onKeyDown={(e) => {
						if (e.code === "Space" || e.code === "Enter") {
							if (inputRef.current) {
								let val = inputRef.current.value;
								if (val.trim() !== "") {
									setMetadata((prevData) => [
										...prevData,
										val,
									]);
								}
								inputRef.current.value = "";
							}
						}
					}}
				/>
				{metadata &&
					metadata.map((metadatum, id) => (
						<mark
							onClick={() =>
								setMetadata(
									metadata.filter((_, idx) => idx !== id),
								)
							}
							key={id}
							className="p-1 bg-teal-100 rounded-md m-1 rounded-tr-none rounded-bl-none"
						>
							#{metadatum}
						</mark>
					))}
			</fieldset>
		</div>
	);
}
