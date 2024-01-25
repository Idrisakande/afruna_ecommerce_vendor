import { RootState } from "@/types/store.type";
import { report } from "process";
import { FC, memo, useState } from "react";
import { CgArrowBottomRight, CgArrowTopRight } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

export const ReportStats = () => {
	const { reports } = useSelector((state: RootState) => state.user);
	/* const [statData] = useState([
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
	]); */
	return (
		<div className={"grid grid-cols-3 gap-2 md:gap-4 p-10 text-xs"}>
			<ReportCard
				stat_data={[
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
				]}
				stat_title="Total Orders"
				stat_value={reports?.visitors as unknown as number}
				trend_direction="up"
				trend_value={0}
				key={"vfisitors"}
			/>
			<ReportCard
				stat_data={[
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
				]}
				stat_title="Total Revenue"
				stat_value={reports?.visitors as unknown as number}
				trend_direction="up"
				trend_value={0}
				key={"evisitors"}
			/>
			<ReportCard
				stat_data={[
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
				]}
				stat_title="Total Visitors"
				stat_value={reports?.visitors as unknown as number}
				trend_direction="up"
				trend_value={0}
				key={"visitors"}
			/>
		</div>
	);
};
interface I_report_card {
	stat_title: string;
	stat_value: number;
	trend_direction: string;
	trend_value: number;
	stat_data: any[];
}
const ReportCard: FC<I_report_card> = memo(
	({ stat_title, stat_value, trend_direction, trend_value, stat_data }) => (
		<div
			className={
				"bg-white/40 p-2 rounded-md border border-afruna-gray/5 flex justify-between w-full items-center"
			}
		>
			<aside className={"flex flex-col space-y-2"}>
				<p className={"font-semibold text-afruna-gray/20"}>
					{stat_title}
				</p>
				<h3 className={"font-medium text-sm"}>
					
					{stat_title !== "Total Visitors" && <>&#x20A6; {" " }</>}
					{stat_value?.toLocaleString()}
				</h3>

				{trend_direction === "up" ? (
					<div className={"flex space-x-2 items-center"}>
						<span
							className={
								"flex items-center text-[12px] rounded-xl space-x-2 w-fit bg-green-500/20 p-1 text-green-500/90"
							}
						>
							<CgArrowTopRight /> {trend_value} %
						</span>
						<span className={"text-[10px]"}> from yesterday</span>
					</div>
				) : (
					<div className={"flex space-x-1 items-center"}>
						<span
							className={
								"flex items-center text-[12px] rounded-xl space-x-2 w-fit bg-red-500/20 p-1 text-red-500/90"
							}
						>
							<CgArrowBottomRight /> {trend_value} %
						</span>
						<span className={"text-[10px]"}> from yesterday</span>
					</div>
				)}
			</aside>
			<aside className={""}>
				<ResponsiveContainer width="100%" height={100}>
					<LineChart data={stat_data}>
						<Tooltip />
						<Line
							strokeWidth={2}
							dataKey={"x"}
							dot={true}
							type={"bump"}
						/>
					</LineChart>
				</ResponsiveContainer>
			</aside>
		</div>
	),
);
