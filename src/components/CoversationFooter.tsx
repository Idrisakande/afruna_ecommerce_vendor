"use client";

import Chat from "@/services/chat.service";
import { RootState } from "@/types/store.type";
import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";
import { FC, useCallback } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { IoPaperPlane } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { useSelector } from "react-redux";

interface MessageInput {
	message: string;
}

interface CoversationFooterProps {
	to?: string;
	id?: string;
}

export const CoversationFooter: FC<CoversationFooterProps> = ({ to, id }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<MessageInput>();
	const { bio_data } = useSelector((state: RootState) => state.user);
console.log("to", to);

	const onSubmit: SubmitHandler<MessageInput> = useCallback(
		async (data) => {
			const chatServices = new Chat();
			chatServices.sendMessage({ ...data, to } as {
				message: string;
				to: string;
			});

			reset();
		},
		[to],
	);

	return (
		<div className="pt-1 pb-4 px-4">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="ml-2 mr-4 bg-white flex  items-center relative border border-[#D5D5E6] rounded-xl overflow-hidden"
			>
				<input
					title={
						bio_data?.blocked
							? "not allowed! contact admin."
							: undefined
					}
					disabled={bio_data?.blocked}
					id="message"
					type="text"
					autoComplete="message"
					placeholder="Message..."
					{...register("message", {
						required: true,
					})}
					className="w-full p-3 font-semibold text-gray-700 text-sm focus:outline-none placeholder:text-[#DBDBDB]"
				/>
				{/* <button className=" min-w-[8rem]">
					<MdAttachFile
						size={37}
						className="text-[#0C0E3B] hover:scale-90 transition duration-300 p-2 cursor-pointer"
					/>
				</button> */}
				<button
					title={
						bio_data?.blocked
							? "not allowed! contact admin."
							: undefined
					}
					disabled={bio_data?.blocked}
					type="submit"
					className={`${
						bio_data?.blocked && "cursor-not-allowed"
					} w-28 h-28 flex justify-start items-end p-4 absolute rounded-full -bottom-2 -right-12 bg-[#00AEEF]`}
				>
					<IoPaperPlane
						size={30}
						className={`${
							bio_data?.blocked && "cursor-not-allowed"
						} text-white hover:scale-90 transition duration-300 cursor-pointer`}
					/>
				</button>
			</form>
		</div>
	);
};
