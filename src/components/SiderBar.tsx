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
  MdGroups,
  MdLogin,
  MdPeopleAlt,
  MdReviews,
  MdSettings,
  MdShoppingBag,
  MdShoppingCart,
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
            link: "/",
            hasOption: false,
            opts: {},
          },
          {
            title: "Vendor",
            Icon: MdPeopleAlt,
            link: "/vendor",
            hasOption: false,
            opts: {},
          },
          {
            title: "Buyers",
            Icon: MdGroups,
            link: "/buyers",
            hasOption: false,
            opts: {},
          },
          {
            title: "Products",
            Icon: MdShoppingBag,
            link: "/products",
            hasOption: true,
            opts: { "0": "Listed Products" },
          },
          {
            title: "Orders",
            Icon: MdShoppingCart,
            link: "/orders",
            hasOption: false,
            opts: {},
          },
          {
            title: "Reviews",
            Icon: MdReviews,
            link: "/reviews",
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
          {
            title: "Logout",
            Icon: MdLogin,
            link: "/auth/login",
            hasOption: false,
            opts: {},
          },
        ].map((SidebarItem) => (
          <div key={SidebarItem.title}>
            {SidebarItem.hasOption ? (
              <Accordion.Root
                asChild
                defaultValue="0"
                type="single"
                collapsible
              >
                <Accordion.Item value="1">
                  <AccordionTrigger
                    className={`${
                      currentRoute === SidebarItem.link
                        ? "text-slate-950 font-extrabold bg-slate-300"
                        : ""
                    } w-full relative group py-2 px-8 mt-3 flex items-center font-medium text-sm text-slate-500/70 hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300`}
                  >
                    <SidebarItem.Icon size={24} className="relative right-2" />
                    <span className="xs:hidden md:inline-block text-sm">
                      {SidebarItem.title}
                    </span>
                    <div
                      className={`${
                        currentRoute === SidebarItem.link ? "opacity-100" : ""
                      } absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  </AccordionTrigger>
                  {/* flex flex-col text-slate-500 text-xs p-1 */}
                  <AccordionContent className={" mb-0 "}>
                    <Link
                      className={`${
                        route === SidebarItem.link ? "text-blue-700" : ""
                      } overflow-hidden relative group px-8 ml-2 mt-3 flex items-center font-medium text-sm text-[#414346] hover:text-blue-700 transition duration-300`}
                      href={"/products"}
                    >
                      Listed Products
                    </Link>
                    <Link
                      className={`${
                        currentRoute === SidebarItem.link ? "text-blue-700" : ""
                      } overflow-hidden relative group px-8 ml-2 mt-3 flex items-center font-medium text-sm text-[#414346] hover:text-blue-700 transition duration-300`}
                      href={"/products/new"}
                    >
                      Create Products
                    </Link>
                    <Link
                      className={`${
                        currentRoute === SidebarItem.link ? "text-blue-700" : ""
                      } overflow-hidden relative group px-8 ml-2 mt-3 flex items-center font-medium text-sm text-[#414346] hover:text-blue-700 transition duration-300`}
                      href={"/products/categories"}
                    >
                      Categories
                    </Link>
                    <hr className="mx-2 mt-4 h-[2px] bg-slate-200" />
                  </AccordionContent>
                </Accordion.Item>
              </Accordion.Root>
            ) : (
              <Link
                className={`${
                  currentRoute === SidebarItem.link
                    ? "text-slate-950 font-extrabold bg-slate-300"
                    : ""
                } w-full relative group py-2 pl-8 mt-3 flex justify-between items-center font-medium text-sm text-slate-500/70 hover:text-slate-950 hover:font-extrabold hover:bg-slate-300 transition duration-300`}
                href={SidebarItem.link}
              >
                <div className="flex justify-start items-center ">
                  <SidebarItem.Icon size={23} className="relative right-2" />
                  <span className="xs:hidden md:inline-block text-sm">
                    {SidebarItem.title}
                  </span>
                </div>
                {SidebarItem.notification && (
                  <div className="flex justify-end mr-6 items-center">
                    <div className="text-white text-[10px] bg-blue-400 w-[18px] h-[18px] flex justify-center items-center rounded-full">
                      {SidebarItem.notification}
                    </div>
                  </div>
                )}
                <div
                  className={`${
                    currentRoute === SidebarItem.link ? "opacity-100" : ""
                  } absolute -right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </Link>
            )}
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
    forwardedRef
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
  )
);

const AccordionContent = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: { children: React.ReactNode; className: string },
    forwardedRef
  ) => (
    <Accordion.Content
      className={classNames("accordion-content", className)}
      {...props}
      ref={forwardedRef as Ref<HTMLDivElement>}
    >
      <div className="">{children}</div>
    </Accordion.Content>
  )
);
