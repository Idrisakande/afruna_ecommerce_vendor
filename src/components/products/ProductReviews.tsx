/* eslint-disable react/display-name */
import {
	FC,
	ReactNode,
	memo,
	useContext,
	useEffect,
	useMemo,
} from "react";
import Image from "next/image";

import { Content } from "./Content";
import { IProductContext } from "@/interfaces/IProductContext";
import { productcontext } from "@/contexts/ProductProvider";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import { FaCheck, FaDotCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { T_review } from "@/types/user.type";
type T_extend = {
	categoryName: string;
	status: string;
	coverPhoto: string;
	productName: string;
};
export type T_product_reviews = T_review & T_extend;
export const ProductReviews: FC<{}> = memo(({}) => {
	const router = useRouter();
	const { categories } = useSelector((state: RootState) => state.categories);
	const { products } = useSelector((state: RootState) => state.products);
	const { reviews } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		const hiddenBTN = document.querySelector(
			"button.bg-gradient-y-deepblue",
		) as HTMLButtonElement;
		hiddenBTN.style.display = "none";
	}, []);

	const product_reviews = useMemo(() => {
		const product_reviews: T_product_reviews[] = [];
		if (reviews?.length) {
			for (let review of reviews) {
				const matching_product_reviews = products.filter(
					(product) => product._id === review.productId,
				);
				for (let category of categories) {
					matching_product_reviews.filter(
						(matched_with_category) =>
							matched_with_category.categoryId === category._id &&
							product_reviews.push({
								...review,
								categoryName: category.name,
								status: "Delivered",
								productName: matched_with_category.name,
								coverPhoto: matched_with_category.coverPhoto[0],
							}),
					);
				}
			}
		}
		return product_reviews;
	}, [reviews, categories, products]);
	console.log(product_reviews);

	/* const RenderStatus = (): ReactNode => {
		let render: JSX.Element;
		switch (status) {
			case "Rejected":
				render = (
					<p
						className={
							"flex text-[12px] space-x-2 items-center  text-red-500/70"
						}
					>
						<MdCancel />
						<span>{status}</span>
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
						<span>{status}</span>
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
						<span>{status}</span>
					</p>
				);
				break;
		}
		return render;
	}; */
	return (
		<Content>
			<div className={"px-3 py-5 w-fit"}>
				{product_reviews.map((review) => {
					const RenderStatus = (): ReactNode => {
						let render: JSX.Element;
						switch (review.status) {
							case "Rejected":
								render = (
									<p
										className={
											"flex text-[12px] space-x-2 items-center  text-red-500/70"
										}
									>
										<MdCancel />
										<span>{review.status}</span>
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
										<span>{review.status}</span>
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
										<span>{review.status}</span>
									</p>
								);
								break;
						}
						return render;
					};
					return (
						<div
							key={review._id}
							className={
								"grid grid-cols-auto md:grid-cols-6 text-[14px] border border-afruna-gray/20 w-fit rounded-md m-4 p-4"
							}
						>
							<Image
								height={40}
								width={40}
								alt={"Product_Image"}
								src={review.coverPhoto}
								className={
									"md:col-span-1 w-44 h-44 object-cover"
								}
							/>
							<div className={"md:col-span-4 font-bold"}>
								<span className={"text-afruna-gold/70"}>
									Review [#{review._id}]
								</span>
								<p className={"text-afruna-blue/70"}>
									{review.productName}
								</p>
								<span
									className={
										"text-afruna-gray/40 font-thin text-[10px]"
									}
								>
									{review.categoryName}
								</span>
								<RenderStatus />
							</div>
							<div className="md:col-span-1">
								<button
									onClick={() =>
										router.push({pathname:"/products/" + review._id,query:review})}
									className={
										"text-afruna-gold/70 block tracking-tight font-semibold"
									}
								>
									Details
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</Content>
	);
});
