import { FC } from "react";

import {
	Bar,
	BarChart,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { ChartStats } from "@/components/ChartStats";
import { Main } from "@/layouts/Main";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { BestSellingProductsTable } from "@/components/widgets/tables/BestSellingProductsTable";
import { ReportStats } from "@/components/ReportStats";

const Index: FC<{}> = () => {
	return (
		<Main breadcrumbs={<Breadcrumbs />}>
			<ReportStats />
			<div className="mx-10 pb-28">
				<ChartStats
					rightComponent={
						<div className="md:col-span-4 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50vh]">
							<header className="flex justify-between w-full p-2 mb-2">
								<h1 className="font-medium text-afruna-blue text-[12px] md:text-sm">
									Visitors
								</h1>
							</header>
							<ResponsiveContainer
								className={"p-1"}
								width="100%"
								height="80%"
							>
								<BarChart
									data={[
										{ name: "Jan", value: 431 },
										{ name: "Feb", value: 74 },
										{ name: "Mar", value: 772 },
										{ name: "Apr", value: 604 },
										{ name: "May", value: 402 },
										{ name: "Jun", value: 222 },
										{ name: "Jul", value: 502 },
										{ name: "Aug", value: 112 },
										{ name: "Sep", value: 128 },
										{ name: "Oct", value: 48 },
										{ name: "Nov", value: 60 },
										{ name: "Dec", value: 163 },
									]}
								>
									<XAxis dataKey={"name"} />
									<YAxis range={[0, 1000]} />
									<Tooltip />
									<Bar
										shape={
											<Rectangle radius={[5, 5, 0, 0]} />
										}
										dataKey={"value"}
										fill="#11133F"
										strokeWidth={1}
										width={20}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					}
				/>
				<BestSellingProductsTable />
			</div>
		</Main>
	);
};

export default Index;
