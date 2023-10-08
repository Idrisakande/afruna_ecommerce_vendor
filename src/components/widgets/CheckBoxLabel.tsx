import { memo, useMemo, useState } from "react";
import { MdCheck } from "react-icons/md";

interface IChechboxLabel {
	placeholders: string[];
	getselectedChecks: (s: string[]) => void;
	headerTitle: string;
}
export default memo(function ColorSelector({
	getselectedChecks,
	headerTitle,
	placeholders,
}: IChechboxLabel) {
	const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
	useMemo(
		() => getselectedChecks(selectedChecks),
		[getselectedChecks, selectedChecks]
	);
	return (
		<div className="w-full">
			<h3 className="mb-1 font-semibold text-sm">{headerTitle}</h3>
			<div className="w-full rounded-lg mt-2 flex flex-wrap justify-start space-x-4 items-center">
				{placeholders.map((placeholder, idx) => (
					<div
						className="flex space-x-2  rounded-lg items-center"
						key={idx}
						onClick={() => {
							if (selectedChecks.includes(placeholder)) {
								// Item is already selected, so remove it from the selection
								setSelectedChecks(
									selectedChecks.filter(
										(selectedItem) =>
											selectedItem !== placeholder
									)
								);
							} else {
								// Item is not selected, so add it to the selection
								setSelectedChecks([
									...selectedChecks,
									placeholder,
								]);
							}
						}}
					>
						<div
							className={`flex justify-center overflow-hidden items-center ${
								selectedChecks.includes(placeholder)
									? "bg-slate-700 text-white"
									: ""
							} rounded overflow-hidden p-2 w-[30px] border-[1px] h-[20px] hover:cursor-pointer`}
						>
							{selectedChecks.includes(placeholder) ? (
								<MdCheck size={25} />
							) : null}
						</div>
						<span className="text-xs">{placeholder}</span>
					</div>
				))}
			</div>
		</div>
	);
});
