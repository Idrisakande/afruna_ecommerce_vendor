import React from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { images, svgs } from "@/constants/images";
// import { IoIosNotifications } from "react-icons/io";
import { HeaderDropdown } from "./widgets/HeaderDropdown";
import { NotificationPopup } from "./widgets/NotificationPopup";
import Image from "next/image";

export function Header() {
	return (
		<nav className={"bg-gradient-afruna h-20 flex items-center"}>
			<div className="flex justify-between items-center max-w-[90%] mx-auto w-full">
				<Link className={""} href={"/"}>
					<Image src={svgs.logo} width={200} alt="Logo" />
				</Link>
				<aside
					className={
						"flex justify-between items-center min-w-[15%] gap-6"
					}
				>
					<NotificationPopup />
					<HeaderDropdown
						title={"Jon Dov"}
						subtitle="Admin"
						profileSrc={images.userImg}
					>
						<Link href={"/profile"}>
							<DropdownMenu.DropdownMenuItem className="cursor-pointer outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300">
								Profile
							</DropdownMenu.DropdownMenuItem>
						</Link>
						<Link href={"/setting"}>
							<DropdownMenu.DropdownMenuItem className="cursor-pointer outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300">
								Setting
							</DropdownMenu.DropdownMenuItem>
						</Link>
						<Link href={"/logout"}>
							<DropdownMenu.DropdownMenuItem className="cursor-pointer outline-none text-xs text-slate-500/70 font-bold p-2 rounded hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300">
								Logout
							</DropdownMenu.DropdownMenuItem>
						</Link>
					</HeaderDropdown>
				</aside>
			</div>
		</nav>
	);
}
