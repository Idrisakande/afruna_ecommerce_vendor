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
			<h3 className="mb-2">{headerTitle}</h3>
			<div className="w-full flex flex-wrap justify-start space-x-4 items-center">
				{placeholders.map((placeholder, idx) => (
					<div
						className="flex space-x-2 items-center"
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
							className={`flex justify-center items-center ${
								selectedChecks.includes(placeholder)
									? "bg-slate-700 text-white"
									: ""
							} rounded-sm p-2 w-[35px] border-[1px] h-[25px] hover:cursor-pointer`}
						>
							{selectedChecks.includes(placeholder) ? (
								<MdCheck size={25} />
							) : null}
						</div>
						<span>{placeholder}</span>
					</div>
				))}
			</div>
		</div>
	);
});
