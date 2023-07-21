import { useState } from "react";
import { CgArrowBottomRight, CgArrowTopRight } from "react-icons/cg";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

export const ReportStats = () => {
	const [statData] = useState([
		{
			stat_title: "Today's Revenue",
			trend_value: 4.2,
			trend_direction: "up",
			stat_value: 9233,
			chartdata: [
				{ x: 4 },
				{ x: 3 },
				{ x: 10 },
				{ x: 9 },
				{ x: 29 },
				{ x: 19 },
				{ x: 22 },
				{ x: 9 },
				{ x: 12 },
				{ x: 7 },
				{ x: 19 },
				{ x: 17 },
				{ x: 12 },
				{ x: 17 },
				{ x: 25 },
			],
		},
		{
			stat_title: "Today's Order",
			trend_value: 7.33,
			trend_direction: "up",
			stat_value: 48067,
			chartdata: [
				{ x: 13 },
				{ x: 21 },
				{ x: 3 },
				{ x: 9 },
				{ x: 11 },
				{ x: 6 },
				{ x: 20 },
				{ x: 9 },
				{ x: 8 },
				{ x: 11 },
				{ x: 9 },
				{ x: 7 },
				{ x: 17 },
				{ x: 22 },
				{ x: 25 },
			],
		},
		{
			stat_title: "Vistors",
			trend_value: 2.12,
			trend_direction: "down",
			stat_value: 1302,
			chartdata: [
				{ x: 7 },
				{ x: 13 },
				{ x: 10 },
				{ x: 9 },
				{ x: 2 },
				{ x: 11 },
				{ x: 22 },
				{ x: 9 },
				{ x: 1 },
				{ x: 7 },
				{ x: 13 },
				{ x: 10 },
				{ x: 2 },
				{ x: 5 },
				{ x: 3 },
			],
		},
	]);
	return (
		<div className={"grid grid-cols-3 gap-2 md:gap-4 p-10 text-xs"}>
			{statData.map((stat, idx) => (
				<div
					key={idx}
					className={
						"bg-white/40 p-2 rounded-md border border-afruna-gray/5 flex justify-between w-full items-center"
					}
				>
					<aside className={"flex flex-col space-y-2"}>
						<p className={"font-semibold text-afruna-gray/20"}>
							{stat.stat_title}
						</p>
						<h3 className={"font-medium text-sm"}>
							{idx === 0 ? "$" : ""}
							{stat.stat_value.toLocaleString()}
						</h3>

						{stat.trend_direction === "up" ? (
							<div className={"flex space-x-2 items-center"}>
								<span
									className={
										"flex items-center text-[12px] rounded-xl space-x-2 w-fit bg-green-500/20 p-1 text-green-500/90"
									}
								>
									<CgArrowTopRight /> {stat.trend_value} %
								</span>
								<span className={"text-[10px]"}>
									{" "}
									from yesterday
								</span>
							</div>
						) : (
							<div className={"flex space-x-1 items-center"}>
								<span
									className={
										"flex items-center text-[12px] rounded-xl space-x-2 w-fit bg-red-500/20 p-1 text-red-500/90"
									}
								>
									<CgArrowBottomRight /> {stat.trend_value} %
								</span>
								<span className={"text-[10px]"}>
									{" "}
									from yesterday
								</span>
							</div>
						)}
					</aside>
					<aside className={""}>
						<ResponsiveContainer width="100%" height={100}>
							<LineChart data={stat.chartdata}>
								<Tooltip />
								<Line
									strokeWidth={2}
									dataKey={"x"}
									dot={false}
									type={"natural"}
								/>
							</LineChart>
						</ResponsiveContainer>
					</aside>
				</div>
			))}
		</div>
	);
};
