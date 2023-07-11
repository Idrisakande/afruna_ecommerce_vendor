import React from "react";
import Image, { StaticImageData } from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const HeaderDropdown = ({
	children,
	profileSrc,
	subtitle,
	title,
}: {
	children: React.ReactNode;
	profileSrc: StaticImageData;
	title: string;
	subtitle: string;
}) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className="hover:cursor-pointer " asChild>
				<div className="flex justify-between items-start min-w-[40%] gap-2">
					<Image
						src={profileSrc}
						alt="profile_image"
						className="w-[40px] mx-2 rounded-full -mt-1"
					/>
					<div className="">
						<h2 className="text-md text-slate-900 font-bold tracking-wide">
							{title}
						</h2>
						<p className="text-xs font-semibold text-slate-400">
							{subtitle}
						</p>
					</div>
				</div>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={
						"bg-slate-100 px-2 py-4 w-[150px] rounded-md flex flex-col z-40"
					}
					sideOffset={15}
				>
					{children}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
