/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import Image from "next/image";
import {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
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
import { IProduct } from "@/interfaces/IProductItem";
import Products from "@/services/products.service";
import store from "@/redux/store";
import { formattedDate } from "@/utils/formatted_date";
import { verifyImageUrl } from "@/utils/verify_image_url";

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
	const [reply, setReply] = useState(false);
	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "none";
	}, []);
	const { query } = useRouter();
	const { productsWithReviews } = useSelector(
		(state: RootState) => state.products,
	);
	const [product, setProduct] = useState<IProduct>();
	useEffect(() => {
		const { products } = store.store.getState().products;
		const product = products.find((product) => product._id === query.id);
		setProduct(product);
	}, [query, store.store]);

	// product is found in proudcts with reviews;
	const productWithReview = useMemo(() => {
		if (!productsWithReviews) return;
		return productsWithReviews.find((product) => product._id === query.id);
	}, [productsWithReviews, query.id]);

	const prod = productWithReview !== undefined ? productWithReview : product;
	console.log(prod);

	return (
		<ProductProvider>
			<div className="relative p-3 text-[12px] pb-28 md:pb-44">
				<section className="grid grid-cols-4 md:h-48">
					<Image
						priority
						height={40}
						width={40}
						src={verifyImageUrl(prod?.coverPhoto[0] as string)}
						alt="productImage"
						className="md:grid-span-1 border border-afruna-blue h-32 w-32"
					/>
					<div className="md:grid-span-1 -ml-24 space-y-2">
						<p className=" text-afruna-gold/70 text-lg">
							{product?.customId}
						</p>
						<p className="text-afruna-blue text-lg">{prod?.name}</p>
						<p className="text-afruna-gray/70 leading-tight font-thin text-[12px]">
							Brand: {prod?.brand}
						</p>
						<p className="text-afruna-gray leading-tight font-thin text-[12px]">
							Price: &#x20A6; {prod?.price.toLocaleString()}
						</p>
						<p className="text-afruna-gray leading-tight font-thin text-[12px]">
							Discount: {prod?.discount.toFixed(2)} %
						</p>
						{/* <RenderStatus /> */}
					</div>
					<div className="p-2 text-afruna-blue flex flex-col gap-2">
						<h1 className="font-bold text-lg">Description</h1>
						<p>{product?.desc}</p>
					</div>
				</section>
				<div className="messages grid gap-2 grid-cols-3">
					{productWithReview &&
						productWithReview.reviews.length > 0 &&
						productWithReview.reviews.map((review) => (
							<div
								key={review.comment}
								className="md:col-span-1 bg-slate-200/40 rounded-md p-2 m-2 h-32"
							>
								<section className="flex mb-3">
									<Image
										height={40}
										width={40}
										src={
											review.userId.avatar ??
											images.afruna_logo
										}
										alt="userImage"
										className="h-10 w-10 object-center rounded-full"
									/>
									<div className="ml-2">
										<p className="capitalize">
											{review.userId.firstName}{" "}
											{review.userId.lastName}
										</p>
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
															__ + 1 <=
															review.rating
																? "text-afruna-gold/70"
																: ""
														}`}
													/>
												))}
										</p>
										<p>{formattedDate(review.createdAt)}</p>
									</div>
								</section>
								<div>
									<p>{review.comment}</p>
								</div>
								{/* <button
								onClick={() => {
									setReply((prev) => !prev);
								}}
								className="flex"
							>
								<MdReply /> Reply
							</button> */}
							</div>
						))}
				</div>
				{/* === REPLY MODAL */}
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
