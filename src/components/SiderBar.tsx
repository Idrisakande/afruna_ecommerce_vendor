/* eslint-disable react/display-name */
import Link from "next/link";
import React, { Ref } from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { useRouter } from "next/router";
import { GoChevronDown } from "react-icons/go";
import {
	MdChat,
	MdCreditCard,
	MdDashboard,
	MdSettings,
	MdShoppingBag,
	MdShoppingCart,
	MdTrendingUp,
} from "react-icons/md";

export function SiderBar() {
	const { route } = useRouter();
	const currentRoute = route === "/" ? "/" : route;
	return (
		<aside className="pt-4 w-24 md:w-48 bg-white h-full">
			<div className="bg-gradient-sidebar h-full snap-both flex flex-col justify-between rounded-r-lg overflow-y-auto overflow-x-hidden">
				{[
					{
						title: "Dashboard",
						Icon: MdDashboard,
						link: "/dashboard",
						hasOption: false,
						opts: {},
					},

					{
						title: "Orders",
						Icon: MdShoppingCart,
						link: "/orders",
						hasOption: false,
						opts: {},
					},
					{
						title: "Products",
						Icon: MdShoppingBag,
						link: "/products",
						hasOption: false,
						opts: {},
					},
					{
						title: "Report",
						Icon: MdTrendingUp,
						link: "/report",
						hasOption: false,
						opts: {},
					},

					{
						title: "Transactions",
						Icon: MdCreditCard,
						link: "/transactions",
						hasOption: false,
						opts: {},
					},
					{
						title: "Chat",
						Icon: MdChat,
						link: "/chat",
						hasOption: false,
						opts: {},
						notification: 5,
					},
					{
						title: "Settings",
						Icon: MdSettings,
						link: "/settings",
						hasOption: false,
						opts: {},
					},
				].map((SidebarItem) => (
					<div key={SidebarItem.title}>
						<Link
							className={`${currentRoute === SidebarItem.link
									? "text-slate-950 font-extrabold bg-slate-300"
									: ""
								} w-full relative group py-2 pl-8 mt-3 flex justify-between items-center font-medium text-[12px] text-slate-500/70 hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300`}
							href={SidebarItem.link}
						>
							<div className="flex justify-start items-center ">
								<SidebarItem.Icon size={23} className="relative right-2" />
								<span className="xs:hidden md:inline-block">
									{SidebarItem.title}
								</span>
							</div>
							{SidebarItem.notification && (
								<div className="flex justify-end mr-6 items-center">
									{/* <div className="text-white text-[8px] bg-blue-400 w-[18px] h-[18px] flex justify-center items-center rounded-full">
										{SidebarItem.notification}
									</div> */}
								</div>
							)}
							<div
								className={`${currentRoute === SidebarItem.link ? "opacity-100" : ""
									} absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
							/>
						</Link>
					</div>
				))}
			</div>
		</aside>
	);
}

const AccordionTrigger = React.forwardRef(
	(
		{
			children,
			className,
			...props
		}: { children: React.ReactNode; className: string },
		forwardedRef,
	) => (
		<Accordion.Header className="">
			<Accordion.Trigger
				className={classNames("accordion-trigger", className)}
				{...props}
				ref={forwardedRef as Ref<HTMLButtonElement>}
			>
				{children}
				<GoChevronDown className="chevrondown" />
			</Accordion.Trigger>
		</Accordion.Header>
	),
);

const AccordionContent = React.forwardRef(
	(
		{
			children,
			className,
			...props
		}: { children: React.ReactNode; className: string },
		forwardedRef,
	) => (
		<Accordion.Content
			className={classNames("accordion-content", className)}
			{...props}
			ref={forwardedRef as Ref<HTMLDivElement>}
		>
			<div className="">{children}</div>
		</Accordion.Content>
	),
);
