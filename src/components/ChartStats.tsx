import { ReactNode, useState } from "react";
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

export function ChartStats({ rightComponent }: { rightComponent: ReactNode }) {
	const [tf, setTF] = useState<string>("");
	return (
		<div className="text-xs grid grid-cols-12 gap-8 snap-mandatory snap-end">
			<div className="md:col-span-8 col-span-full bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50vh]">
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
			</div>
			{rightComponent}
		</div>
	);
}
