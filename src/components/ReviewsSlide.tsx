import { useCallback, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { MdStar } from "react-icons/md";

import { RootState } from "@/types/store.type";
import { images } from "@/constants/images";

export const ReviewsSlide = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const handleNextSlide = useCallback(() => {
		setCurrentIndex((count) => count + 1);
	}, []);
	const handlePrevSlide = useCallback(() => {
		setCurrentIndex((count) => count - 1);
	}, []);
	const { reviews, recent_reviewers } = useSelector(
		(state: RootState) => state.user,
	);

	if (!recent_reviewers?.length)
		return (
			<div className="flex text-afruna-blue justify-center items-center flex-col gap-2 md:gap-4">
				<Image
					className="object-contain h-40 w-40"
					src={images.noResult}
					alt="no_recent_reviews"
				/>
				<h1 className="font-semibold text-xl">No Recents Reviews</h1>
			</div>
		);
	return reviews?.length ? (
		<div className="relative p-3 space-y-2 h-fit">
			<button
				disabled={currentIndex === 0}
				onClick={handlePrevSlide}
				className={`absolute flex justify-center items-center text-sm hover:border-afruna-gold/30 hover:border bg-white p-1 left-0 top-[40px] rounded-full shadow-md ${
					currentIndex === 0 &&
					"cursor-pointer-disabled hover:border-afruna-gray/30 hover:border-none"
				}`}
			>
				<RxChevronLeft />
			</button>
			<button
				disabled={reviews && currentIndex + 1 === reviews.length}
				onClick={handleNextSlide}
				className={`absolute flex justify-center items-center text-sm hover:border-afruna-gold/30 hover:border bg-white p-1 right-0 top-[30px] rounded-full shadow-md ${
					reviews &&
					currentIndex + 1 === reviews.length &&
					"hover:border-afruna-gray/30 hover:border-none"
				}`}
			>
				<RxChevronRight />
			</button>

			<div className="flex justify-evenly items-center p-1 ">
				<Image
					width={50}
					height={50}
					src={recent_reviewers[currentIndex]?.avatar??images.afruna_logo}
					alt="review image"
					className="rounded-full h-12  w-12 object-center"
				/>
				<div className="flex flex-col text-afruna-blue">
					<p className="text-xs font-bold">
						{recent_reviewers[currentIndex]?.firstName}{" "}
						{recent_reviewers[currentIndex]?.lastName}
					</p>
					<span className="flex mx-[2px]">
						{Array(5)
							.fill("_")
							.map((star, id) => (
								<MdStar
									className={`${
										id + 1 <= reviews[currentIndex].rating
											? "text-afruna-gold"
											: "text-slate-300"
									} text-[10px] md:text-xs`}
									key={id}
								/>
							))}
					</span>
					<p className={`text-[10px] md:text-[12px]`}>
						{new Date(
							reviews && reviews[currentIndex].createdAt,
						).toUTCString()}
					</p>
				</div>
			</div>
			<p className="text-[12px]">{reviews[currentIndex].comment}</p>
		</div>
	) : null;
};
