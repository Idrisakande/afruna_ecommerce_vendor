import { FC, ReactNode, memo } from "react";

export const Content: FC<{ children: ReactNode }> = memo(({ children }) => (
	<div className="mx-6 space-y-2 rounded-md bg-white border border-afruna-gray/20 ">
		{children}
	</div>
));
