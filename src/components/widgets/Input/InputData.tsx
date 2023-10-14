import { useEffect, useRef, useState } from "react";
import { IInputMetadata } from "@/interfaces/inputs.interfaces";
import { MdClose } from "react-icons/md";

export function InputData({
	getMetadata,
	headerTitle,
	placeholder,
}: IInputMetadata) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [data, setData] = useState<string[]>([]);
	 useEffect(() => {
			getMetadata(data);
		}, [data]);

	return (
		<div className="w-full">
		<h3 className="text-sm font-semibold mb-1 ">{headerTitle}</h3>
			<fieldset className="flex flex-wrap items-center px-1  border-[1px] border-slate-300 rounded-lg">
				<input
					ref={inputRef}
					type="text"
					className="w-full p-3 text-sm"
					placeholder={placeholder}
					onKeyDown={(e) => {
						if (e.code === "Space" || e.code === "Enter" || e.key === "Enter") {
							if (inputRef.current) {
								let val = inputRef.current.value;
								if (val.trim() !== "") {
									const uniquesData = new Set(data);
									uniquesData.add(val);
									setData(Array.from(uniquesData));
								}
								inputRef.current.value = "";
							}
						}
					}}
				/>
				{data &&
					data.map((metadatum, id) => (
						<mark
							onClick={() =>
								setData(
									data.filter((_, idx) => idx !== id),
								)
							}
							key={id}
							className="p-1 group bg-gray-300/90 cursor-pointer rounded-md m-1 rounded-tr-none rounded-bl-none"
						>
							#{metadatum}
							<MdClose className="hidden ml-4 group-hover:inline" />
						</mark>
					))}
			</fieldset>
		</div>
	);
}
