import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { IoIosNotifications, IoMdTime } from "react-icons/io";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { CheckBox } from "@/components/widgets/CheckBox";
import { NewNotification, oldNotification } from "@/constants/data";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { DotsPopup } from "./DotsPopup";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { RxCross2 } from "react-icons/rx";

export const NotificationPopup = () => (
	<Popover.Root>
		<Popover.Trigger className="text-afruna-blue" asChild>
			<button
				className="relative cursor-pointer focus:outline-none"
				aria-label="Update dimensions"
			>
				<IoIosNotifications className="text-2xl -mt-1" />
				<div className="absolute -top-2 -right-1 bg-red-500 text-white text-[0.55rem] font-semibold w-4 h-4 rounded-full flex justify-center items-center">
					8
				</div>
			</button>
		</Popover.Trigger>
		<Popover.Portal className="relative">
			<Popover.Content
				className="PopoverContent sticky text-xs text-afruna-blue top-[45%] z-50 overflow-hidden bg-white w-[30rem] shadow-md mt-6 mr-40 rounded-md"
				sideOffset={5}
			>
				<div className="flex pb-5 mt-20 px-4 justify-between items-start">
					<div className=" ml-2">
						<div className="flex gap-4 justify-start items-center">
							<h2 className="font-extrabold text-xl">
								Notifcation
							</h2>{" "}
							<span className="px-1 text-sm bg-pink-100 rounded-sm text-red-500">
								04
							</span>
						</div>
						<p className="font-medium text-base mt-2">
							You have 3 uread messages
						</p>
					</div>
					<DotsPopup />
				</div>
				<div className="h-[1px] bg-slate-300 ml-2 mr-2" />
				<ScrollArea.Root className="ScrollAreaRoot w-full h-[62vh] px-4 pb-2 bg-white overflow-hidden shadow-md">
					<ScrollArea.Viewport className="ScrollAreaViewport w-full h-full pb-6">
						<h1 className="text-xl text-slate-600 py-5 ml-2">
							New
						</h1>

						<div className="flex flex-col gap-2 mx-2">
							{NewNotification.length &&
								NewNotification.map(
									({ message, time, check }) => {
										return (
											<div
												key={message}
												className="p-4 flex gap-3 rounded-lg justify-between items-start bg-[#F4F7F9]"
											>
												{check === true ? (
													<div className="w-12 h-10 flex justify-center items-center bg-sky-200 rounded-full">
														<BsFillChatLeftTextFill className="w-4" />
													</div>
												) : (
													<div className="w-14 h-10 flex justify-center items-center bg-pink-100 rounded-full">
														<BiMessageRoundedDetail className="w-4" />
													</div>
												)}

												<div className="min-w-[18rem] w-full flex flex-col justify-center items-start text">
													<h2 className="font-semibold text-[1.05rem]">
														{message}
													</h2>
													<div className="mt-2 flex justify-start items-center text-slate-400">
														<IoMdTime className="mr-1" />
														<span>{time}</span>
													</div>
												</div>
												<CheckBox />
											</div>
										);
									}
								)}
						</div>
						<h1 className="text-xl text-slate-600 py-5 ml-2">
							Read before
						</h1>
						<div className="flex flex-col gap-2 mx-2">
							{oldNotification &&
								oldNotification.map(
									({ message, time, check }) => {
										return (
											<div
												key={message}
												className="p-4 flex gap-3 rounded-lg justify-between items-start bg-[#F4F7F9]"
											>
												{check === true ? (
													<div className="w-12 h-10 flex justify-center items-center bg-sky-200 rounded-full">
														<BsFillChatLeftTextFill className="w-4" />
													</div>
												) : (
													<div className="w-14 h-10 flex justify-center items-center bg-pink-100 rounded-full">
														<BiMessageRoundedDetail className="w-4" />
													</div>
												)}

												<div className="min-w-[18rem] w-full flex flex-col justify-center items-start text">
													<h2 className="font-semibold text-[1.05rem]">
														{message}
													</h2>
													<div className="mt-2 flex justify-start items-center text-slate-400">
														<IoMdTime className="mr-1" />
														<span>{time}</span>
													</div>
												</div>
												<CheckBox />
											</div>
										);
									}
								)}
						</div>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						className="ScrollAreaScrollbar p-[2px] rounded-xl mb-4 flex bg-slate-100 hover:bg-slate-200"
						orientation="vertical"
					>
						<ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
					</ScrollArea.Scrollbar>
					<ScrollArea.Scrollbar
						className="ScrollAreaScrollbar"
						orientation="horizontal"
					>
						<ScrollArea.Thumb className="" />
					</ScrollArea.Scrollbar>
					<ScrollArea.Corner className="" />
				</ScrollArea.Root>
				<Popover.Close
					className="PopoverClose text-pink-400 hover:text-white hover:bg-pink-300 transition duration-300 h-[30px] w-[30px] flex justify-center items-center rounded-full absolute top-4 right-5"
					aria-label="Close"
				>
					<RxCross2 className="w-6 h-6 " />
				</Popover.Close>
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
);
