/* eslint-disable react/display-name */
import { FC, memo, useContext, useState } from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { IProductContext } from "@/interfaces/IProductContext";
import { productcontext } from "@/contexts/ProductProvider";
import Image from "next/image";
import { images } from "@/constants/images";
import { useRouter } from "next/router";
import Link from "next/link";
import { array } from "joi";
import ReviewDetails from "../../pages/products/product-review";

export const ProductReviews: FC<{}> = memo(({}) => {
	const { handleViewReview } = useContext(productcontext) as IProductContext;
	const router = useRouter();
	const ProductStatus = [
		{
			id: 1,
			name: "Men Tshirt vintage",
			category: "Fashion",
			status: "Rejected",
			image: images.product,
		},
		{
			id: 2,
			name: "Men Tshirt Burberry",
			category: "Fashion",
			status: "Delivered",
			image: images.product1,
		},
		{
			id: 3,
			name: "Iphone13",
			category: "Phones",
			status: "Pending",
			image: images.product2,
		},
		{
			id: 4,
			name: "Blouse ans skirts",
			category: "Fashion",
			status: "Pending",
			image: images.product4,
		},
		{
			id: 5,
			name: "Men Tshirt vintage",
			category: "Fashion",
			status: "Rejected",
			image: images.product7,
		},
	];
	return (
		<Content>
			<div>
				{ProductStatus.map((status) => (
					<div
						className="flex my-2 px-4 py-2 items-start justify-between w-full "
						key={status.id}
					>
						<section className=" flex">
							<Image
								src={status.image}
								alt="productImage"
								className="w-[25vw] h-[50vh]"
							/>
							<div className="mx-1 px-3 flex flex-col justify-around h-5/6 ">
								<p className="text-md text-orange-300">
									# {status.id}
								</p>
								<p>{status.name}</p>
								<p className="text-xs text-slate-300">
									{status.category}
								</p>
								<p>{status.status}</p>
							</div>
						</section>
						<button
							onClick={() => {
								handleViewReview(status);

								setTimeout(
									() =>
										router.push("products/product-review"),
									1000
								);
							}}
							className="text-orange-300"
						>
							{" "}
							See Details
						</button>
					</div>
				))}
			</div>
		</Content>
	);
});
