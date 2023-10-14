import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Main } from "@/layouts/Main";
import { UsersList } from "@/components/UsersList";
import { CurrentUserHeader } from "@/components/CurrentUserHeader";
import { CurrentUsersConversations } from "@/components/CurrentUsersConversations";
import { CoversationFooter } from "@/components/CoversationFooter";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { MdAdd, MdArrowBack, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import Chat from "@/services/chat.service";
import { T_convo, T_msg_alias } from "@/types/user.type";
import { getChatTimeDiff } from "@/utils/chat_time_diff";
import withAuth10 from "@/hooks/withAuth10";
import store from "@/redux/store";
import User from "@/services/user.service";
import useSearchConvo from "@/hooks/useSearchConvo";
import * as Avatar from "@radix-ui/react-avatar";
export default withAuth10(function Index() {
	const router = useRouter();
	const { convo, messages } = useSelector((state: RootState) => state.chat);
	const { bio_data, usersWithReviews,users } = useSelector(
		(state: RootState) => state.user,
	);
	useEffect(() => {
		const _ = new Chat();
		const ___ = new User();
	}, []);
	const [activeChat, setActiveChat] = useState(messages);
	const [activeChatHeader, setActiveChatHeader] = useState<T_convo>(convo[0]);
	useEffect(() => {
		setActiveChat(messages);
	}, [convo]);
const { searchResult, setSearchInput } = useSearchConvo({ data: convo });

	const moreUsers = useMemo(
		() =>
			users &&
			users.filter(
				(user) => user?._id !== activeChat[0]?.from._id,
			).filter((user)=> user?._id !== bio_data?._id),
			// usersWithReviews &&
			// usersWithReviews.filter(
			// 	(user) => user._id !== activeChat[0]?.from._id,
			// ),
		[activeChat, usersWithReviews],
	);

	return (
		<Main breadcrumbs={<Breadcrumbs />}>
			<main className="p-2 px-8 pt-5 flex gap-5">
				<div className="flex gap-3 flex-col  bg-[#FDFDFF] h-full xl:min-w-[30%] xl:max-h-[70vh] overflow-hidden border border-afruna-gray/30 rounded-2xl xl:pt-6 xl:pl-2">
					<h2 className="ml-4 mt-5 text-[1.4rem] text-afruna-blue font-medium tracking-tight">
						Messages
					</h2>
					<div className="ml-4 mr-6 bg-white flex items-center border border-afruna-gray/30 rounded-md overflow-hidden">
						<input
							onChange={(e) => setSearchInput(e.target.value)}
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
							{searchResult && searchResult.length > 0
								? searchResult.map((user) => (
										<UsersList
											lastMessage={user.lastMessage}
											selectChat={() => {
												const chatServices = new Chat();
												chatServices.getMessage(
													user?._id,
												);
												chatServices.getConversations();

												const messages =
													store.store.getState().chat
														.messages;
												setActiveChatHeader(user);
												setActiveChat(messages);
											}}
											key={user._id}
											name={user?.alias ?? ""}
											number={user?.unreadMessages}
											active={false}
											img={user?.aliasAvatar}
											id={user.recipients[0]}
										/>
								  ))
								: null}
							<Fab
								//openinig the fab
								onClick={() => {
									document
										.querySelector("ul.rtf")
										?.classList.replace("closed", "open");
								}}
								mainButtonStyles={{
									background: "darkblue",
									bottom: 0,
									top: 100,
									right: 0,
									padding: 20,
									position: "absolute",
								}}
								event="click"
								style={{
									position: "relative",
									bottom: 180,
									width: "content-fit",
									height: "content-fit",
								}}
								icon={<MdAdd />}
							>
								<div
									onClick={() => {
										document
											.querySelector("ul.rtf")
											?.classList.replace(
												"open",
												"closed",
											);
									}}
									className="cursor-pointer relative top-0 py-4 bg-gray-300/90 backdrop:blur-lg rounded-lg p-1 w-[40vh] max-h-[40vh] h-fit overflow-y-auto"
								>
									<button className="p-2">
										<MdArrowBack />
									</button>
									{moreUsers && moreUsers.length > 0 ? (
										moreUsers
											.filter(
												(unBlockedUser) =>
													unBlockedUser?.blocked ===
													false,
											)
											.map((user) => (
												<button
													onClick={() => {
														setActiveChatHeader({
															_id: "",
															alias: `${user?.firstName} ${user?.lastName}`,
															aliasAvatar:
																user?.avatar as string,
															createdAt:
																Date.now().toLocaleString(),
															updatedAt: "",
															lastMessage: "",
															recipients: [],
															unreadMessages: 0,
														});
														setActiveChat([
															{
																_id: "",
																conversation:
																	"",
																to: {
																	...user,
																} as unknown as T_msg_alias,
																from: {
																	...bio_data,
																} as unknown as T_msg_alias,
																message: "",
																attachment: [],
																seen: [],
																createdAt: "",
																updatedAt: "",
															},
														]);
														document
															.querySelector(
																"ul.rtf",
															)
															?.classList.replace(
																"open",
																"closed",
															);
													}}
													key={user?._id}
													className="flex items-center place-items-center gap-2 hover:bg-gray-300/90 w-full rounded-lg"
												>
													<Avatar.Root>
														<Avatar.Image
															className="object-cover rounded-full text-afruna-blue p-1 w-12 h-12"
															src={user?.avatar}
														/>
														<Avatar.Fallback className="text-afruna-blue p-1 w-12 h-12 justify-center rounded-full bg-afruna-blue/20 flex uppercase items-center">
															{user?.firstName.at(
																0,
															)}
															{user?.lastName.at(
																0,
															)}
														</Avatar.Fallback>
													</Avatar.Root>
													<span>
														{user?.firstName}{" "}
														{user?.lastName}
													</span>
												</button>
											))
									) : (
										<>empty member!</>
									)}
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
