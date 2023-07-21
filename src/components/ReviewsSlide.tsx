import { useCallback, useState } from "react";
import Image from "next/image";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { MdStar } from "react-icons/md";
import { IReview } from "../interfaces/IReview";
import { reviews } from "@/constants/data";

export const ReviewsSlide = () => {
	const [review] = useState<IReview[]>(reviews);
	const [currentIndex, setCurrentIndex] = useState(0);
	const handleNextSlide = useCallback(() => {
		setCurrentIndex((count) => count + 1);
	}, []);
	const handlePrevSlide = useCallback(() => {
		setCurrentIndex((count) => count - 1);
	}, []);

	return (
		<div className="relative p-3 space-y-2">
			<button
				disabled={currentIndex === 0}
				onClick={handlePrevSlide}
				className={`absolute flex justify-center items-center text-sm hover:border-afruna-gold/30 hover:border bg-white p-1 left-0 top-[40px] rounded-full shadow-md ${
					currentIndex === 0 && "cursor-pointer-disabled"
				}`}
			>
				<RxChevronLeft />
			</button>
			<button
				disabled={currentIndex + 1 === review.length}
				onClick={handleNextSlide}
				className="absolute flex justify-center items-center text-sm hover:border-afruna-gold/30 hover:border bg-white p-1 right-0 top-[30px] rounded-full shadow-md"
			>
				<RxChevronRight />
			</button>

			<div className="flex justify-evenly items-center p-1 ">
				<Image
					width={50}
					src={review[currentIndex].img}
					alt="review image"
					className="rounded-full"
				/>
				<div className="flex flex-col text-afruna-blue">
					<p className="text-xs font-bold">
						{review[currentIndex].name}
					</p>
					<span className="flex mx-[2px]">
						{Array(5)
							.fill("_")
							.map((star, id) => (
								<MdStar
									className={`${
										id + 1 <= review[currentIndex].rated
											? "text-afruna-gold"
											: "text-slate-300"
									} text-[10px] md:text-xs`}
									key={id}
								/>
							))}
					</span>
					<p className={`text-[10px] md:text-[12px]`}>
						{review[currentIndex].date.toDateString()}
					</p>
				</div>
			</div>
			<p className="text-[12px]">{review[currentIndex].comment}</p>
		</div>
	);
};
