/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { images } from "@/constants/images";
import { ProductProvider, productcontext } from "@/contexts/ProductProvider";
import { IProductContext } from "@/interfaces/IProductContext";
import { MdCancel, MdReply, MdStar } from "react-icons/md";
import { HiX } from "react-icons/hi";

const messages = [
	{
		user: "Mohammed Ali",
		image: images.userImg1,
		rating: 3.6,
		comment: "I'm happy to get my product delivered in good keep.",
		date: "05 April 2016",
	},
	{
		user: "Omarion Sheneal",
		image: images.userImg,
		rating: 4.2,
		comment: "Wow I'm grateful for your services dear seller!",
		date: "04 April 2006",
	},
	{
		user: "Mohammed Ali",
		image: images.userImg1,
		rating: 5,
		comment:
			"Nice dress i love this so much . you are the best platform for marketting you got all the good your customers are looking for. please keep up the good work",
		date: "15 days ago",
	},
];
export default function() {
	return (
		<ProductProvider>
			<ReviewDetails />
		</ProductProvider>
	);
}

function ReviewDetails() {
	const { product_review } = useContext(productcontext) as IProductContext;
	const [reply, setReply] = useState(false);
	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "none";
	}, []);

	return (
		<div className="relative p-3 text-[12px] pb-28 md:pb-44">
			<section className="grid grid-cols-4 md:h-48">
				<Image
					src={product_review?.image ?? ""}
					alt="productImage"
					className="md:grid-span-1"
				/>
				<div className="md:grid-span-3">
					<p className=" text-afruna-gold/70"># {product_review?.id}</p>
					<p>{product_review?.name}</p>
					<p className="text-slate-300">{product_review?.category}</p>
					<p>{product_review?.status}</p>
				</div>
			</section>
			<div className="messages grid grid-cols-6">
				{messages.map((message) => (
					<div
						key={message.rating}
						className="md:col-span-3 bg-slate-200/40 rounded-md p-2 m-2 h-32"
					>
						<section className="flex mb-3">
							<Image
								src={message.image}
								alt="userImage"
								className="h-10 w-10 rounded-full"
							/>
							<div className="ml-2">
								<p>{message.user}</p>
								<p className={"flex space-x-[1px] items-center"}>
									{Array(5)
										.fill("_")
										.map((_, __) => (
											<MdStar
												className={`${__ + 1 <= message.rating ? "text-afruna-gold/70" : ""
													}`}
											/>
										))}
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
							}}
							className="flex"
						>
							<MdReply /> Reply
						</button>
					</div>
				))}
			</div>
			<div
				className={`${reply
						? "flex fixed z-20 left-0 top-0  items-center justify-center w-screen bg-black/40 h-screen"
						: "hidden"
					}`}
			>
				<form className="relative flex flex-col p-10 text-afruna-blue m-auto rounded-lg bg-white h-fit w-[50vw] ">
					<button
						type="button"
						className="absolute right-4"
						onClick={() => setReply(false)}
					>
						<HiX />
					</button>
					<div>
						<p className="">Message</p>
						<textarea className="p-5 w-full border border-afruna-gray/40 rounded-md" />
					</div>
					<button
						type="submit"
						className="self-end mb-5 text-white bg-afruna-blue rounded-md p-2"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
