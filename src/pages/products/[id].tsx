/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import Image from "next/image";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { images } from "@/constants/images";
import { ProductProvider, productcontext } from "@/contexts/ProductProvider";
import { IProductContext } from "@/interfaces/IProductContext";
import { MdCancel, MdReply, MdStar } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { Router, useRouter } from "next/router";
import { T_product_reviews } from "@/components/products/ProductReviews";
import { FaCheck, FaDotCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";

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

export default function () {
    const RenderStatus = (): ReactNode => {
        let render: JSX.Element;
        switch (query.status) {
            case "Rejected":
                render = (
                    <p
                        className={
                            "flex text-[12px] space-x-2 items-center  text-red-500/70"
                        }
                    >
                        <MdCancel />
                        <span>{query.status}</span>
                    </p>
                );
                break;
            case "Delivered":
                render = (
                    <p
                        className={
                            "flex text-[12px] space-x-2 items-center  text-green-500/70"
                        }
                    >
                        <FaCheck />
                        <span>{query.status}</span>
                    </p>
                );
                break;
            default:
                render = (
                    <p
                        className={
                            "flex space-x-2 text-[12px] items-center text-slate-500/70"
                        }
                    >
                        <FaDotCircle />
                        <span>{query.status}</span>
                    </p>
                );
                break;
        }
        return render;
    };
    const [reply, setReply] = useState(false);
	useEffect(() => {
        const hiddenBTN = document.querySelector(
            "button.bg-gradient-y-deepblue",
            ) as HTMLButtonElement;
            hiddenBTN.style.display = "none";
        }, []);
        const { query } = useRouter();
    const { reviews,reviewers } = useSelector((state: RootState) => state.user);

    const match_reviews =  useMemo(()=> reviews?.filter(review=> review.productId === query.productId),[reviews, query.productId])
    const with_bio_reviews = useMemo(() => {
        const compile = [];
        if (match_reviews?.length && reviewers?.length)
            for (let match of match_reviews) {
                for (let reviewer of reviewers) {
                    match.userId._id === reviewer._id && compile.push({...match, email:reviewer.email, fullName: `${reviewer.firstName} ${reviewer.lastName}`, avatar:reviewer.avatar})
                }
            }
        return compile
    }, [reviewers, match_reviews]);

	return (
		<ProductProvider>
			<div className="relative p-3 text-[12px] pb-28 md:pb-44">
				<section className="grid grid-cols-4 md:h-48">
					<Image
						height={40}
						width={40}
						src={query?.coverPhoto as string}
						alt="productImage"
						className="md:grid-span-1 h-44 w-44"
					/>
					<div className="md:grid-span-3">
						<p className=" text-afruna-gold/70"># {query?._id}</p>
						<p className="text-afruna-blue/70">{query?.productName}</p>
						<p className=										"text-afruna-gray/40 font-thin text-[10px]">{query?.categoryName}</p>
						<RenderStatus />
					</div>
				</section>
				<div className="messages grid grid-cols-6">
					{with_bio_reviews.map((review) => (
						<div
							key={review.rating}
							className="md:col-span-3 bg-slate-200/40 rounded-md p-2 m-2 h-32"
						>
							<section className="flex mb-3">
                                <Image
                                    height={40}
                                    width={40}
									src={review.avatar??images.afruna_logo}
									alt="userImage"
									className="h-10 w-10 object-center rounded-full"
								/>
								<div className="ml-2">
									<p className="capitalize">{review.fullName}</p>
									<p
										className={
											"flex space-x-[1px] items-center"
										}
									>
										{Array(5)
											.fill("_")
											.map((_, __) => (
												<MdStar
													key={__ * review.rating}
													className={`${
														__ + 1 <= review.rating
															? "text-afruna-gold/70"
															: ""
													}`}
												/>
											))}
									</p>
									<p>{new Date(review.createdAt).toUTCString()}</p>
								</div>
							</section>
							<div>
								<p>{review.comment}</p>
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
					className={`${
						reply
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
							<p className="">review</p>
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
		</ProductProvider>
	);
}
