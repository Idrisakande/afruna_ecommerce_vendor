"use client";

import { ReactElement, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/router";
import { FaArrowRight, FaChevronDown, FaPlus } from "react-icons/fa";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import { Fallback } from "@/components/widgets/Fallback";
import { Main } from "@/layouts/Main";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { COLORS, line_data, pie_data } from "@/constants/data";
import SalesTable from "@/components/widgets/tables/SalesTable";
import RecentOrderTable from "@/components/widgets/tables/RecentOrderTable";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Button } from "@/components/Button";
import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";

const Index = () => {
	const router = useRouter();
	const [tf, setTF] = useState<string>("");
	const [value, onChange] = useState<Date[]>([new Date(), new Date()]);

	return (
		//catch components errors
		<ErrorBoundary fallback={Fallback as unknown as ReactElement}>
			<Main
				breadcrumbs={<Breadcrumbs />}
				asideComponent={
					<button
						onClick={() => router.push("/products/new")}
						className="flex justify-between items-center rounded-lg p-4 bg-green-300"
					>
						<FaPlus className="text-slate-900" />
						<span className="mx-3 text-slate-900">
							Add New Product
						</span>
					</button>
				}
			>
				<main className="my-8 m-12 pb-20">
					<div className="grid grid-cols-4 gap-8 my-10 snap-mandatory snap-y snap-center">
						{[
							{ title: "Total Earning's", value: 22933 },
							{ title: "Total Orders", value: 1137 },
							{ title: "Total Users", value: 902 },
							{ title: "Total Products", value: 4159 },
						].map(({ title, value }, idx) => (
							<div
								key={idx}
								className={`lg:col-span-1 md:col-span-2 col-span-full p-7 bg-cover ${
									idx % 2 ? "cardbg-red" : "cardbg-blue"
								} border-[1px] rounded-lg shadow-sm h-[140px]`}
							>
								<h1 className="text-xl font-medium text-slate-900">
									{title}
								</h1>
								<h1 className="text-3xl font-bold mt-2">
									{idx !== 0
										? value.toLocaleString("en-US")
										: "$" + value.toLocaleString("en-US")}
								</h1>
							</div>
						))}
					</div>
					<div className="grid grid-cols-12 gap-8 snap-mandatory snap-end">
						<div className="lg:col-span-8 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50vh]">
							<header className="flex justify-between items-center p-2 mb-2">
								<h1 className="font-medium text-slate-700 text-lg">
									Revenue vs Order
								</h1>
								<div className="w-1/2 flex justify-evenly items-center">
									{[
										"daily",
										"weekly",
										"monthly",
										"yearly",
									].map((timeframe, idx) => (
										<button
											onClick={() => setTF(timeframe)}
											className={`p-2 rounded-md capitalize text-sm font-light text-slate-500 hover:bg-blue-500 hover:text-white ${
												tf === timeframe
													? "bg-blue-500 text-white"
													: ""
											}`}
											key={idx}
										>
											{timeframe}
										</button>
									))}
								</div>
							</header>
							<ResponsiveContainer width="100%" height="80%">
								<LineChart data={line_data}>
									<CartesianGrid
										vertical={false}
										strokeDasharray="3 3"
									/>
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend
										align="left"
										iconType="circle"
										iconSize={7}
									/>
									<Line
										type="monotone"
										dataKey="revenue"
										stroke="green"
									/>
									<Line
										type="monotone"
										dataKey="order"
										stroke="tomato"
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
						<div className="lg:col-span-4 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50vh]">
							<header className="p-2 mb-2">
								<h1 className="font-medium text-slate-700 text-lg">
									Sales by categories
								</h1>
							</header>
							<ResponsiveContainer width="100%" height="80%">
								<PieChart>
									<Pie
										data={pie_data}
										innerRadius={30}
										outerRadius={73}
										fill="#8884d8"
										dataKey="value"
									>
										{pie_data.map((_, index) => (
											<Cell
												values="value"
												key={`cell-${index}`}
												strokeWidth={0.5}
												strokeLinecap="round"
												fill={COLORS[index]}
											/>
										))}
									</Pie>
									<Legend
										align="left"
										iconType="circle"
										iconSize={5}
										fontSizeAdjust={1.4}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-8 my-10">
						<div className="lg:col-span-7 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50h]">
							<header className="flex justify-between items-center p-2 mb-2">
								<h1 className="font-medium text-slate-700 text-lg">
									Current user growth
								</h1>
								<div>
									<DateRangePicker
										onChange={
											onChange as (value: Value) => void
										}
										value={value}
										format="MM-dd"
										clearIcon={null}
										calendarIcon={<FaChevronDown />}
									/>
								</div>
							</header>
							<ResponsiveContainer width="100%" height={300}>
								<LineChart data={line_data}>
									<CartesianGrid
										vertical={false}
										strokeDasharray="3 3"
									/>
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />

									<Line
										type="monotone"
										dataKey="order"
										stroke="tomato"
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
						<div className="lg:col-span-5 xs:col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm h-fit">
							<header className="flex justify-between items-center p-2 mb-2">
								<h1 className="font-medium text-slate-700 text-lg">
									Top selling products
								</h1>
								<button
									onClick={() => router.push("/vendor")}
									className="p-2 flex justify-between items-center"
								>
									<span className="mr-2">More</span>
									<FaArrowRight />
								</button>
							</header>
							<SalesTable />
						</div>
					</div>
					{/* Recent orders */}
					<div className="my-10 w-full">
						<ScrollArea.Root className="ScrollAreaRoot w-full h-[65vh] px-4 pb-2 bg-white overflow-auto rounded-xl border shadow-sm border-slate-300">
							<ScrollArea.Viewport className="ScrollAreaViewport relative w-full h-full pb-6">
								<div className="bg-white z-10 sticky top-0 left-0 right-0 w-full flex justify-between items-center border-b border-[#D5D5E6] py-4">
									<h1 className="text-xl font-semibold">
										Recent Orders
									</h1>
									<Button
										skyBlue
										onClick={() => router.push("/orders")}
										className="text-white"
									>
										Veiw all
									</Button>
								</div>
								<RecentOrderTable />
							</ScrollArea.Viewport>
							<ScrollArea.Scrollbar
								className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
								orientation="vertical"
							>
								<ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
							</ScrollArea.Scrollbar>
							<ScrollArea.Scrollbar
								className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200 "
								orientation="horizontal"
							>
								<ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
							</ScrollArea.Scrollbar>
							<ScrollArea.Corner className="" />
						</ScrollArea.Root>
					</div>
				</main>
			</Main>
		</ErrorBoundary>
	);
};

export default Index;
