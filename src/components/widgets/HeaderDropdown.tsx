import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { images } from "@/constants/images";
import { verifyImageUrl } from "@/utils/verify_image_url";

export const HeaderDropdown = ({
	children,
	profileSrc,
	subtitle,
	title,
}: {
	children: React.ReactNode;
	profileSrc:   string|StaticImageData;
	title: string;
	subtitle?: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<DropdownMenu.Root onOpenChange={setIsOpen}>
			<DropdownMenu.Trigger className="hover:cursor-pointer " asChild>
				<div className="flex justify-between items-center min-w-[40%] gap-2">
					<Image
						src={verifyImageUrl(profileSrc as string)}
						width={50}
						height={50}
						alt="profile_image"
						className="h-9  w-9 object-center mx-2 rounded-full -mt-1"
					/>
					<div className="">
						<h2 className="text-xs md:text-md text-afruna-blue font-bold tracking-wide capitalize">
							{title}
						</h2>
						<p className="text-[12px] md:text-xs font-semibold text-slate-400 capitalize">
							{subtitle}
						</p>
					</div>
					{isOpen ? <RxChevronUp /> : <RxChevronDown />}
				</div>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={
						"bg-white sm:w-48 md:44 text-slate-300 text-xs md:text-sm rounded-md shadow-md flex flex-col z-50"
					}
					sideOffset={15}
				>
					{children}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
