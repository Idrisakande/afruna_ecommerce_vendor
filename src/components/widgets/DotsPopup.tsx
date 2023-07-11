import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { BsThreeDotsVertical } from "react-icons/bs";

export const DotsPopup = () => (
	<Popover.Root>
		<Popover.Trigger asChild>
			<button
				className="cursor-pointer focus:outline-none"
				aria-label="Update dimensions"
			>
				<BsThreeDotsVertical className=" w-6 h-8 bg-slate-50 " />
			</button>
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content
				className="PopoverContent mr-36 mt-4 font-semibold  text-sm flex flex-col gap-1 border border-slate-300 bg-white w-[10rem] rounded-md px-3 py-4"
				sideOffset={5}
			>
				<button className="p-1 text-start rounded-sm  hover:bg-slate-200 transition duration-300 outline-none focus:outline-none ">
					Clear All
				</button>
				<button className="p-1 text-start rounded-sm hover:bg-slate-200 transition duration-300 outline-none focus:outline-none ">
					Clear selection
				</button>
				<button className="p-1 text-start rounded-sm hover:bg-slate-200 transition duration-300 outline-none focus:outline-none ">
					Mark all as read
				</button>
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
);
