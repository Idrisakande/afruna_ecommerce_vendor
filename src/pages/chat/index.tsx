"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Main } from "@/layouts/Main";
import { IoSearchOutline } from "react-icons/io5";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { images } from "@/constants/images";
import { conversations, users } from "@/constants/data";
import { UsersList } from "@/components/UsersList";
import { CurrentUserHeader } from "@/components/CurrentUserHeader";
import { CurrentUsersConversations } from "@/components/CurrentUsersConversations";
import { CoversationFooter } from "@/components/CoversationFooter";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import Chat from "@/services/chat.service";
import { T_convo, T_msg_alias } from "@/types/user.type";
import { getChatTimeDiff } from "@/utils/chat_time_diff";

export default function Index() {
	const router = useRouter();
	const chat = router.route === "/chat" ? "Chat" : "";
	const { convo, messages } = useSelector((state: RootState) => state.chat);
	const { bio_data } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		const _ = new Chat();
	}, []);
	const [activeChat] = useState(messages);
	const [activeChatHeader, setActiveChatHeader] = useState<T_convo>(convo[0]);

	return (
		<Main breadcrumbs={<Breadcrumbs />}>
			<main className="p-2 px-8 pt-5 flex gap-5">
				<div className="flex gap-3 flex-col  bg-[#FDFDFF] h-full xl:min-w-[30%] xl:max-h-[70vh] overflow-hidden border border-afruna-gray/30 rounded-2xl xl:pt-6 xl:pl-2">
					<h2 className="ml-4 mt-5 text-[1.4rem] text-afruna-blue font-medium tracking-tight">
						Messages
					</h2>
					<div className="ml-4 mr-6 bg-white flex items-center border border-afruna-gray/30 rounded-md overflow-hidden">
						<input
							type="text"
							placeholder="Search Name, Id..."
							className="w-full p-2 focus:outline-none placeholder:text-afruna-gray/30"
						/>
						<div className="w-14 text-afruna-gray/40">
							<MdSearch className="text-2xl" />
						</div>
					</div>
					<div className="mt-1 pt-2">
						<div className="flex flex-col gap-2 p-3 h-[45vh] overflow-x-hidden overflow-y-auto">
							{convo
								? convo.map((buyer) => (
										<UsersList
											lastMessage={buyer.lastMessage}
											setActiveChat={() => {
												const chatServices = new Chat();
												chatServices.getMessage(
													buyer._id,
												);
												chatServices.getConversations();
												
												setActiveChatHeader(buyer);
											}}
											key={buyer._id}
											name={buyer.alias}
											number={buyer.unreadMessages}
											active={false}
											img={buyer.aliasAvatar}
											id={buyer.recipients[0]}
										/>
								  ))
								: null}
						</div>
					</div>
				</div>
				{activeChat.length ? (
					<div className=" min-w-[68%] xl:max-h-[70vh] overflow-hidden flex flex-col bg-white border border-text-afruna-gray/30 rounded-2xl">
						<div className="h-24 px-8 border-b border-text-afruna-gray/30 flex justify-center items-center">
							<CurrentUserHeader
								name={activeChatHeader.alias}
								img={activeChatHeader.aliasAvatar}
								active={false}
								id={activeChatHeader._id}
							/>
						</div>
						<div>
							<div className="flex flex-col gap-1 pt-2 px-4 h-[40vh] overflow-x-hidden overflow-y-auto">
								{activeChat.map((chat) => (
									<CurrentUsersConversations
										key={chat._id}
										img={chat.from.avatar}
										message={chat.message}
										time={getChatTimeDiff(new Date(chat.createdAt))}
										isOwn={chat.from._id === bio_data?._id?true:false}
									/>
								))}
							</div>
						</div>
						<CoversationFooter to={activeChat[0].to._id} />
					</div>
				) : null}
			</main>
		</Main>
	);
}
