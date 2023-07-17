/* eslint-disable react/display-name */
import { FC, memo } from "react";
import { MdStar, MdStarHalf } from "react-icons/md";
import Image from "next/image";
import { IProductItem } from "@/interfaces/IProductItem";

export const ProductItem: FC<IProductItem> = memo(
	({
		item_img,
		item_name,
		price,
		rated,
		slashed_price,
		category,
		date,
		order,
		published,
		rating,
		stock,
		discount,
		checkbox,
		handleSelect,
	}) => {
		return published ? (
			<div className="relative flex flex-col hover:bg-afruna-gray/10 bg-afruna-gray/5 backdrop-blur-sm rounded-md shadow-sm text-[12px] md:text-xs p-3">
				{checkbox && (
					<input
						type="checkbox"
						className={`absolute top-1 left-1 cursor-pointer w-4 h-4`}
						onChange={handleSelect}
					/>
				)}
				{discount ? (
					<span className="absolute font-semibold rounded-tr-md top-0 right-0 p-1 text-white bg-red-500 -1 text-[12px]">
						-{discount}%
					</span>
				) : null}
				<header className="flex flex-col items-center space-y-2 p-1">
					<Image src={item_img} alt={"ProductImage_"} width={100} />
					<div className="flex self-start w-full items-center justify-between">
						<p>
							${price}{" "}
							<s className="text-afruna-gray/30">
								${slashed_price}
							</s>
						</p>
						<span className="space-x-1 flex items-center">
							{rating}
							{rating && rating < 5 ? (
								<MdStarHalf className="text-afruna-gold/60" />
							) : (
								<MdStar className="text-afruna-gold/60" />
							)}
						</span>
					</div>
					<div className="self-start">
						<h3 className="text-[12px]">{item_name}</h3>
						<p className="text-afruna-gray/60 text-[10px]">
							{category}
						</p>
					</div>
					<div className="w-full flex text-[12px] self-start justify-between items-center space-x-[1px]">
						<div className="p-2 text-center">
							<p>{stock}</p>
							<p className="text-afruna-gray/40">Stock</p>
						</div>
						<div className="p-2 text-center border-x-2 border-dotted">
							<p>{order}</p>
							<p className="text-afruna-gray/40">Order</p>
						</div>
						<div className="p-2 text-center">
							<p>{date?.toLocaleString("en-US").split(",")[0]}</p>
							<p className="text-afruna-gray/40">Published</p>
						</div>
					</div>
				</header>
			</div>
		) : (
			<div className="relative flex flex-col hover:bg-afruna-gray/10 bg-afruna-gray/5 backdrop-blur-sm rounded-md shadow-sm text-[12px] md:text-xs p-3">
				{checkbox && (
					<input
						type="checkbox"
						className={`absolute top-1 left-1 cursor-pointer w-4 h-4`}
						onChange={handleSelect}
					/>
				)}
				{discount ? (
					<span className="absolute font-semibold rounded-tr-md top-0 right-0 p-1 text-white bg-red-500 -1 text-[12px]">
						-{discount}%
					</span>
				) : null}
				<header className="flex flex-col my-auto items-center space-y-2 p-1">
					<Image src={item_img} alt={"ProductImage_"} width={100} />
					<p>{item_name}</p>
					<div className="flex items-center space-x-[1px]">
						{Array(5)
							.fill("_")
							.map((_, __, arr) => {
								return (
									<MdStar
										key={_ + __}
										className={`${
											__ + 1 <= rated
												? "text-afruna-gold/60"
												: "text-slate-300"
										}`}
									/>
								);
							})}
					</div>
				</header>
				<footer className="flex mt-auto justify-between items-center space-y-2 p-1">
					<span>${price}</span>
					<s className="text-afruna-gray/30">${slashed_price}</s>
				</footer>
			</div>
		);
	}
);
