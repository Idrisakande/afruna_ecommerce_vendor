/* eslint-disable react/display-name */
import { FC, ReactNode, memo } from "react";

export const Header: FC<{ headerTitle?: string; rightComponent?: ReactNode }> =
	memo(({ rightComponent, headerTitle }) => (
		<header className="p-3 flex flex-wrap justify-between items-center text-afruna-blue border-b border-afruna-gray/20">
			<h1 className="font-medium  self-end text-afruna-blue text-xs md:text-lg tracking-tight">
				{headerTitle ? headerTitle : null}
			</h1>
			{rightComponent ? rightComponent : null}
		</header>
	));
