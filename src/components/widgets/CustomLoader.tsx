import { FC } from "react";
import { RiLoader4Fill } from "react-icons/ri";

interface loader {
    prompt: string;
}
export const CustomLoader:FC<loader> = ({prompt}) => {
	return (
		<div className="flex gap-2 items-center">
			<RiLoader4Fill
				className="animate-spin text-afruna-gold"
				size={26}
			/>
			<span className="animate-pulse text-xs text-afruna-blue font-light">
				{prompt}
			</span>
		</div>
	);
};
