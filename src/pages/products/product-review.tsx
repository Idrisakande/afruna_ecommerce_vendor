/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import Image from "next/image";
import React, { useContext, useState } from "react";
import { images } from "@/constants/images";
import { PiArrowBendUpLeft, PiX } from "react-icons/pi";
import { ProductProvider, productcontext } from "@/contexts/ProductProvider";
import { IProductContext } from "@/interfaces/IProductContext";

const messages = [
	{
		user: "Mohammed Ali",
		image: images.userImg1,
		rating: "5stars",
		comment: "I'm happy to get my product delivered in good keep.",
		date: "05 April 2016",
	},
	{
		user: "Mohammed Ali",
		image: images.userImg,
		rating: "3stars",
		comment: "",
		date: "04 April 2006",
	},
	{
		user: "Mohammed Ali",
		image: images.userImg1,
		rating: "4stars",
		comment:
			"Nice dress i love this so much . you are the best platform for marketting you got all the good your customers are looking for. please keep up the good work",
		date: "15 days ago",
	},
];
export default function () {
	return (
		<ProductProvider>
			<ReviewDetails />
		</ProductProvider>
	);
}

function ReviewDetails() {
	const { product_review } = useContext(productcontext) as IProductContext;
	const [reply, setReply] = useState(false);
	return (
		<div className="relative">
			<section className="flex justify-around w-[80vw] p-3">
				<Image
					src={product_review?.image ?? ""}
					alt="productImage"
					className="w-[25vw] h-[50vh]"
				/>
				<div className="mx-1 px-3 flex flex-col justify-around h-5/6 ">
					<p className="text-md text-orange-300">
						# {product_review?.id}
					</p>
					<p>{product_review?.name}</p>
					<p className="text-xs text-slate-300">
						{product_review?.category}
					</p>
					<p>{product_review?.status}</p>
				</div>
			</section>
			<div className="messages">
				{messages.map((message) => (
					<div
						key={message.rating}
						className=" bg-slate-200 rounded-md p-2 m-2 h-[50vh]"
					>
						<section className="flex mb-3">
							<Image
								src={message.image}
								alt="userImage"
								className="h-10 w-10 rounded-full"
							/>
							<div className="ml-2">
								<p>{message.user}</p>
								<p className="text-yellow-300">
									{message.rating}
								</p>
								<p>{message.date}</p>
							</div>
						</section>
						<div>
							<p>{message.comment}</p>
						</div>
						<button
							onClick={() => {
								setReply((prev) => !prev);
								console.log(reply, " iam hit");
							}}
							className="flex"
						>
							<PiArrowBendUpLeft /> Reply
						</button>
					</div>
				))}
			</div>
			<div
				className={`absolute top-0   h-screen ${
					reply ? "flex" : "hidden"
				} items-center justify-center w-screen bg-black/40 `}
			>
				<form className="reply_pop  p-10 rounded-lg bg-white h-[70%] w-[60%] ">
					<PiX onClick={() => setReply((prev) => !prev)} />

					<textarea
						placeholder="Message"
						className="w-full h-full border-[1px] border-slate-300 rounded-md"
					/>
					<button type="submit" className="mb-5">
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
