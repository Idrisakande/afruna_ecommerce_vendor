/* eslint-disable react/display-name */
import { FC, ReactNode, memo } from "react";

export const Content: FC<{ children: ReactNode }> = memo(({ children }) => (
	<div className="w-full my-10 space-y-2 rounded-md bg-white border border-afruna-gray/20 ">
		{children}
	</div>
));
