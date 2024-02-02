/* eslint-disable react/display-name */
import { FC, ReactNode, memo, useEffect } from "react";

import { Content } from "./Content";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import { FaCheck, FaDotCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import { T_review } from "@/types/user.type";
import Products from "@/services/products.service";

const reviewProducts = new Products();
export type TReviewExtension = {
	categoryName?: string;
	status?: string;
	coverPhoto?: string;
	productName?: string;
};
export type T_product_reviews = T_review & TReviewExtension;
export const ProductReviews: FC<{}> = memo(({}) => {
	const router = useRouter();
	const { categories } = useSelector((state: RootState) => state.categories);
	const { products, productsWithReviews } = useSelector(
		(state: RootState) => state.products,
	);

	console.log("res p", productsWithReviews);
	const RenderStatus: FC<T_product_reviews> = ({ status }): ReactNode => {
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
	};
	return (
		<Content>
			<div className={"px-3 py-5 w-fit"}>
				{productsWithReviews.map((review) => (
					<RenderStatus {...review} key={review._id} />
				))}
			</div>
		</Content>
	);
});
