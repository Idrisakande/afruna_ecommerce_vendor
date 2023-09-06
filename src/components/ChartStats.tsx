import { ReactNode, useMemo, useState } from "react";
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

import { line_data } from "@/constants/data";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";

export function ChartStats({ rightComponent }: { rightComponent: ReactNode }) {
	const [tf, setTF] = useState<string>("daily");
	const { revenue_vs_order } = useSelector((state: RootState) => state.user);

	const active_table_data = useMemo(() => {
		switch (tf) {
			case "weekly":
				return revenue_vs_order?.weekly;
			case "monthly":
				return revenue_vs_order?.monthly;
			case "yearly":
				return revenue_vs_order?.yearly;

			default:
				return revenue_vs_order?.daily;
		}
	}, [
		tf,
		revenue_vs_order?.daily,
		revenue_vs_order?.monthly,
		revenue_vs_order?.weekly,
		revenue_vs_order?.yearly,
	]);
	return (
		<div className="text-xs grid grid-cols-12 gap-8 snap-mandatory snap-end">
			<div className="md:col-span-8 col-span-full bg-white p-2 rounded-lg border-[1px] shadow-sm">
				<header className="flex justify-between items-center p-2 mb-2">
					<h1 className="font-bold text-afruna-blue md:text-sm text-[12px]">
						Revenue vs Order
					</h1>
					<div className="w-1/2 flex justify-evenly items-center">
						{["daily", "weekly", "monthly", "yearly"].map(
							(timeframe, idx) => (
								<button
									onClick={() => setTF(timeframe)}
									className={`p-1 rounded-md capitalize md:text-xs font-light text-slate-500 hover:bg-gradient-y-deepblue hover:text-white ${
										tf === timeframe
											? "bg-gradient-y-deepblue text-white"
											: ""
									}`}
									key={idx}
								>
									{timeframe}
								</button>
							),
						)}
					</div>
				</header>
				{active_table_data?.length ? (
					<ResponsiveContainer width="100%" height="80%">
						<LineChart data={active_table_data}>
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
								dot={false}
								type="monotone"
								dataKey="revenue"
								stroke="green"
							/>
							<Line
								dot={false}
								type="monotone"
								dataKey="order"
								stroke="tomato"
							/>
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className="flex h-fit flex-col items-center">
						<h1>No Available Data</h1>
					</div>
				)}
			</div>
			{rightComponent}
		</div>
	);
}
