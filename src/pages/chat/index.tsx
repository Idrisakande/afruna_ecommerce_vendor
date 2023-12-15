import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Main } from "@/layouts/Main";
import { UsersList } from "@/components/UsersList";
import { CurrentUserHeader } from "@/components/CurrentUserHeader";
import { CurrentUsersConversations } from "@/components/CurrentUsersConversations";
import { CoversationFooter } from "@/components/CoversationFooter";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { MdAdd, MdArrowBack, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import Chat from "@/services/chat.service";
import { T_convo, T_msg } from "@/types/user.type";
import { getChatTimeDiff } from "@/utils/chat_time_diff";
import withAuth10 from "@/hooks/withAuth10";
import User from "@/services/user.service";
import useSearchConvo from "@/hooks/useSearchConvo";
import * as Avatar from "@radix-ui/react-avatar";
import { verifyImageUrl } from "@/utils/verify_image_url";
import withAuth from "@/hooks/withAuth";
import { images } from "@/constants/images";
import { updateMessages } from "@/redux/features/chat.slice";
export default withAuth(function Index() {
	const router = useRouter();
	const { convo, messages } = useSelector((state: RootState) => state.chat);
	const { bio_data, users } = useSelector((state: RootState) => state.user);
	const [to, setTo] = useState<string>();
	const [activeChat, setActiveChat] = useState<T_msg[]>(messages);
	const [activeChatHeader, setActiveChatHeader] = useState<T_convo>(convo[0]);
	useEffect(() => {
		const ___ = new User();
		const _ = new Chat();
	}, []);
	const dispatch = useDispatch();
	const getMessages = useCallback(
		async (id: string) => {
			const _ = new Chat();
			const messages = await _.getMessage(id);
			dispatch(updateMessages(messages as T_msg[]));
			console.log("msg");
			console.log(messages);
			
		},
		[dispatch],
	);
	const { searchResult, setSearchInput } = useSearchConvo({ data: convo });

	// const moreUsers = useMemo(
	// 	() =>
	// 		users &&
	// 		users.filter(
	// 			(user) => user?._id !== activeChat[0]?.from._id,
	// 		).filter((user)=> user?._id !== bio_data?._id),
	// 		// usersWithReviews &&
	// 		// usersWithReviews.filter(
	// 		// 	(user) => user._id !== activeChat[0]?.from._id,
	// 		// ),
	// 	[activeChat, usersWithReviews],
	// );

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
					<div className="mt-1 relative pt-2">
						<div className="flex relative flex-col gap-2 p-3 h-[45vh] overflow-x-hidden overflow-y-auto">
							{searchResult && searchResult.length > 0
								? searchResult.map((convo) => (
										<UsersList
											lastMessage={convo.lastMessage}
											selectChat={() => {
												if (bio_data) {
													const foundAt =
														convo.recipients.indexOf(
															bio_data._id,
														); // get the index of the sender
													const receiver =
														convo.recipients[
															foundAt > 0 ? 0 : 1
														];
													setTo(receiver);
												}
												const chatServices = new Chat();
												chatServices.getMessage(
													convo?._id,
												);
												// const messages =
												// 	store.store.getState().chat
												// 		.messages;
												setActiveChatHeader(convo);
												getMessages(convo._id);
											}}
											key={convo?._id}
											name={convo?.alias ?? ""}
											number={convo?.unreadMessages}
											active={false}
											img={convo?.aliasAvatar}
											id={convo?._id}
										/>
								  ))
								: null}
						</div>
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
										?.classList.replace("open", "closed");
								}}
								className="cursor-pointer relative top-0 py-4 bg-gray-300/90 backdrop:blur-lg rounded-lg p-1 w-[40vh] max-h-[40vh] h-fit overflow-y-auto"
							>
								<button className="p-2">
									<MdArrowBack />
								</button>
								{users && users.length > 0 ? (
									users
										.filter(
											(unBlockedUser) =>
												unBlockedUser?.blocked ===
													false &&
												unBlockedUser.role ===
													"vendor" &&
												unBlockedUser._id !==
													bio_data?._id,
										)
										.map(
											(user) =>
												user && (
													<button
														onClick={() => {
															setTo(user._id); // set receiver id
															setActiveChatHeader(
																{
																	_id: user._id,
																	alias: `${user.firstName} ${user.lastName}`,
																	aliasAvatar:
																		user.avatar as string,
																	createdAt:
																		Date.now().toLocaleString(),
																	updatedAt:
																		"",
																	lastMessage:
																		"",
																	recipients:
																		[
																			user._id,
																			bio_data?._id as unknown as string,
																		],
																	unreadMessages: 0,
																},
															);
															if (bio_data) {
																setActiveChat([
																	{
																		_id: "",
																		conversation:
																			"",
																		to: {
																			_id: user._id,
																			addresses:
																				[],
																			avatar: user?.avatar,
																			country:
																				user?.country,
																			createdAt:
																				user.createdAt,
																			email: user?.email,
																			firstName:
																				user.firstName,
																			isVendor:
																				false,
																			lastName:
																				user.lastName,
																			password:
																				"",
																			phoneNumber:
																				user.phoneNumber,
																			role: user.role,
																			updatedAt:
																				user.updatedAt,
																			verificationToken:
																				"",
																		},
																		from: {
																			_id: bio_data._id,
																			addresses:
																				[],
																			avatar: bio_data.avatar,
																			country:
																				bio_data.country,
																			createdAt:
																				bio_data.createdAt,
																			email: bio_data.email,
																			firstName:
																				bio_data.firstName,
																			isVendor:
																				false,
																			lastName:
																				bio_data.lastName,
																			password:
																				"",
																			phoneNumber:
																				bio_data.phoneNumber,
																			role: bio_data.role,
																			updatedAt:
																				bio_data.updatedAt,
																			verificationToken:
																				"",
																		},
																		message:
																			"",
																		attachment:
																			[],
																		seen: [],
																		createdAt:
																			"",
																		updatedAt:
																			"",
																	},
																]);
															}

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
																src={user?.avatar as string}
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
												),
										)
								) : (
									<>empty member!</>
								)}
							</div>
						</Fab>
					</div>
				</div>
				{messages.length ? (
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
								{messages.map((chat) => (
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
						<CoversationFooter
							id={activeChat[0].conversation}
							to={to}
						/>
					</div>
				) : null}
			</main>
		</Main>
	);
});
