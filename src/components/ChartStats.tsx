import { useCallback, useMemo, useState } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Image, { StaticImageData } from "next/image";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

import { line_data } from "@/constants/data";
import { images } from "@/constants/images";
import { MdStar } from "react-icons/md";

export function ChartStats() {
	const [tf, setTF] = useState<string>("");
	return (
		<div className="grid grid-cols-12 gap-8 snap-mandatory snap-end">
			<div className="md:col-span-8 col-span-full bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50vh]">
				<header className="flex justify-between items-center p-2 mb-2">
					<h1 className="font-bold text-afruna-blue text-sm md:text-lg">
						Revenue vs Order
					</h1>
					<div className="w-1/2 flex justify-evenly items-center">
						{["daily", "weekly", "monthly", "yearly"].map(
							(timeframe, idx) => (
								<button
									onClick={() => setTF(timeframe)}
									className={`p-2 rounded-md capitalize text-sm font-light text-slate-500 hover:bg-gradient-whitishblue hover:text-white ${
										tf === timeframe
											? "bg-gradient-y-deepblue text-white"
											: ""
									}`}
									key={idx}
								>
									{timeframe}
								</button>
							)
						)}
					</div>
				</header>
				<ResponsiveContainer width="100%" height="80%">
					<LineChart data={line_data}>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend align="left" iconType="circle" iconSize={7} />
						<Line
							type="monotone"
							dataKey="revenue"
							stroke="green"
						/>
						<Line type="monotone" dataKey="order" stroke="tomato" />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="md:col-span-4 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50vh]">
				<header className="p-2 mb-2">
					<h1 className="font-bold text-afruna-blue text-sm md:text-lg">
						Recent Reviews
					</h1>
				</header>
				<ReviewsSlide />
			</div>
		</div>
	);
}
interface IReview {
	img: StaticImageData;
	rated: number;
	name: string;
	date: Date;
	comment: string;
}
const reviews: IReview[] = [
	{
		comment: "The product came well packaged and I loved it.",
		date: new Date(),
		img: images.profileImg,
		name: "James Toshima",
		rated: 5,
	},
	{
		comment: "The product came well packaged and I loved it.",
		date: new Date(),
		img: images.profileImg,
		name: "Juan Toshima",
		rated: 3,
	},
	{
		comment: "The product came well packaged and I loved it.",
		date: new Date(),
		img: images.profileImg,
		name: "Jane Toshima",
		rated: 5,
	},
	{
		comment: "The product came well packaged and I loved it.",
		date: new Date(),
		img: images.profileImg,
		name: "Jolly Toshima",
		rated: 4,
	},
];

const ReviewsSlide = () => {
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
