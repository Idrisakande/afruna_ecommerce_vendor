import { memo, useMemo, useState } from "react";

interface IColorSelector {
	colors: string[];
	getselectedColor: (s: string) => void;
	headerTitle: string;
}
export default memo(function ColorSelector({
	colors,
	getselectedColor,
	headerTitle,
}: IColorSelector) {
	const [selectedColor, setSelectedColor] = useState("");
	useMemo(
		() => getselectedColor(selectedColor),
		[getselectedColor, selectedColor]
	);
	return (
		<div>
			<h3 className="mb-2">{headerTitle}</h3>
			<div className="w-full flex space-x-4 items-center">
				{colors.map((color, idx) => (
					<span
						key={idx}
						style={{ background: color }}
						onClick={() => setSelectedColor(color)}
						className={`${
							color === selectedColor
								? "border-slate-500"
								: "border-slate-300"
						} rounded-sm p-2 w-[35px] border-[1px] h-[25px] hover:cursor-pointer`}
					/>
				))}
			</div>
		</div>
	);
});
