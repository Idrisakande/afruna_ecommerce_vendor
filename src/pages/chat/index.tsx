import { Fab } from "react-tiny-fab";
import 'react-tiny-fab/dist/styles.css';
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Main } from "@/layouts/Main";
import { IoSearchOutline } from "react-icons/io5";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { images } from "@/constants/images";
import { conversations, reviews, users } from "@/constants/data";
import { UsersList } from "@/components/UsersList";
import { CurrentUserHeader } from "@/components/CurrentUserHeader";
import { CurrentUsersConversations } from "@/components/CurrentUsersConversations";
import { CoversationFooter } from "@/components/CoversationFooter";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { MdAdd, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import Chat from "@/services/chat.service";
import { T_convo, T_msg_alias } from "@/types/user.type";
import { getChatTimeDiff } from "@/utils/chat_time_diff";
import withAuth10 from "@/hooks/withAuth10";
import store from "@/redux/store";
import Image from "next/image";
import User from "@/services/user.service";

export default withAuth10(function Index() {
	const router = useRouter();
	const { convo, messages } = useSelector((state: RootState) => state.chat);
	const { bio_data,usersWithReviews } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		const _ = new Chat();
		const ___ = new User(); 
	}, []);
	const [activeChat,setActiveChat] = useState(messages);
	const [activeChatHeader, setActiveChatHeader] = useState<T_convo>(convo[0]);
	useEffect(() => {
		setActiveChat(messages);
	}, [convo])

	const moreUsers = useMemo(()=> usersWithReviews && usersWithReviews.filter((user => user._id !== activeChat[0]?.from._id)),[activeChat, usersWithReviews])
	

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
					<div className="relative mt-1 pt-2">
						<div className="relative flex flex-col gap-2 p-3 h-[45vh] overflow-x-hidden overflow-y-auto">
							{convo
								? convo.map((user) => (
										<UsersList
											lastMessage={user.lastMessage}
											setActiveChat={() => {
												const chatServices = new Chat();
												chatServices.getMessage(
													user._id,
												);
												chatServices.getConversations();
												
												const messages = store.store.getState().chat.messages;
												setActiveChatHeader(user);
												setActiveChat(messages);
												// router.reload();const messages = store.store.getState().chat.messages;
											}}
											key={user._id}
											name={bio_data?._id ===user._id?bio_data.lastName:user.alias}
											number={user.unreadMessages}
											active={false}
											img={bio_data?._id ===user._id?bio_data.avatar:user.aliasAvatar}
											id={user.recipients[0]}
										/>
								  ))
								: null}
							
							<Fab onClick={() => {
								document.querySelector("ul.rtf")?.classList.replace("closed", "open")
							}} mainButtonStyles={{background:"darkblue",bottom: -140, right: 0, position: "absolute"}} event="click" style={{position:"relative"}} icon={<MdAdd />}>
								<div onClick={()=>{document.querySelector("ul.rtf")?.classList.replace("open", "closed")}} className="cursor-pointer bg-gray-300/70 rounded-lg p-1 w-[40vh] max-h-[40vh] h-fit overflow-y-auto">
									{moreUsers && moreUsers.length > 0?moreUsers.map((userWithReview) => (
										<button onClick={() => {
											
												setActiveChat([{
	_id: "",
	conversation: "",
	to: {...userWithReview} as unknown as T_msg_alias,
	from: {...bio_data} as T_msg_alias,
	message: "",
	attachment: [],
	seen: [],
	createdAt: "",
	updatedAt: "",
												}])
											document.querySelector("ul.rtf")?.classList.replace("open", "closed")
											
										}} key={userWithReview?._id} className="flex items-center place-items-center gap-2 hover:bg-gray-300/90 w-full rounded-lg">
											<Image width={30} height={30} className="rounded-full w-12 h-12 object-fill" alt={userWithReview?.email} src={userWithReview?.avatar ?? images.afruna_logo} priority />
											<span>{userWithReview?.firstName} {userWithReview?.lastName }</span>
										</button>

									)):<>empty member!</>}
</div>
							</Fab>
						</div>
					</div>
				</div>
				{activeChat.length ? (
					<div className=" min-w-[68%] xl:max-h-[70vh] overflow-hidden flex flex-col bg-white border border-text-afruna-gray/30 rounded-2xl">
						<div className="h-24 px-8 border-b border-text-afruna-gray/30 flex justify-center items-center">
							<CurrentUserHeader
								name={activeChatHeader?.alias}
								img={activeChatHeader?.aliasAvatar}
								active={false}
								id={activeChatHeader?._id}
							/>
						</div>
						<div>
							<div className="flex flex-col gap-1 pt-2 px-4 h-[40vh] overflow-x-hidden overflow-y-auto">
								{activeChat.map((chat) => (
									<CurrentUsersConversations
										key={chat?._id}
										img={chat?.from.avatar}
										message={chat?.message}
										time={getChatTimeDiff(
											new Date(chat?.createdAt),
										)}
										isOwn={
											chat.from._id === bio_data?._id
												? true
												: false
										}
									/>
								))}
							</div>
						</div>
						<CoversationFooter to={activeChat[0]?.to?._id} />
					</div>
				) : null}
			</main>
		</Main>
	);
});