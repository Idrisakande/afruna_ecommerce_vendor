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
import { formattedDate } from "@/utils/formatted_date";
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
	const { products,productsWithReviews } = useSelector((state: RootState) => state.products);
	

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
				{productsWithReviews.map((review) => {
					// const RenderStatus = (): ReactNode => {
					// 	let render: JSX.Element;
					// 	switch (review.quantity) {
					// 		case "Rejected":
					// 			render = (
					// 				<p
					// 					className={
					// 						"flex text-[12px] space-x-2 items-center  text-red-500/70"
					// 					}
					// 				>
					// 					<MdCancel />
					// 					<span>{review.status}</span>
					// 				</p>
					// 			);
					// 			break;
					// 		case "Delivered":
					// 			render = (
					// 				<p
					// 					className={
					// 						"flex text-[12px] space-x-2 items-center  text-green-500/70"
					// 					}
					// 				>
					// 					<FaCheck />
					// 					<span>{review.status}</span>
					// 				</p>
					// 			);
					// 			break;
					// 		default:
					// 			render = (
					// 				<p
					// 					className={
					// 						"flex space-x-2 text-[12px] items-center text-slate-500/70"
					// 					}
					// 				>
					// 					<FaDotCircle />
					// 					<span>{review.status}</span>
					// 				</p>
					// 			);
					// 			break;
					// 	}
					// 	return render;
					// };
					return (
						<div
							key={review._id}
							className={
								"grid grid-cols-auto md:grid-cols-6 text-[14px] border border-afruna-gray/20 w-fit rounded-md m-4 p-4 gap-2"
							}
						>
							<Image
								height={40}
								width={40}
								priority
								alt={"Product_Image"}
								src={review.coverPhoto[0]}
								className={
									"md:col-span-1 w-44 h-44 object-cover"
								}
							/>
							<div className={"md:col-span-4 font-bold"}>
								<span className={"text-afruna-gold/70"}>
									{ review.customId}
								</span>
								<p className={"text-afruna-blue/70"}>
									{review.name}
								</p><span
									className={
										"text-afruna-gray/90 font-thin text-[8px]"
									}
								>
									{review.categoryId}
								</span>
								<h1
									className={
										"text-afruna-blue/90 font-thin text-[12px]"
									}
								>
									{formattedDate(review.reviews[0].createdAt)}
								</h1>
								{/* <RenderStatus /> */}
							</div>
							<div className="md:col-span-1">
								<button
									onClick={() =>
										router.push({pathname:"/products/" + review._id,query:review._id})}
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
