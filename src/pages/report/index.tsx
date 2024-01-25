import { FC, useEffect } from "react";

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
import Reports from "@/services/reports.service";
import { useSelector } from "react-redux";
import { RootState } from "@/types/store.type";
import withAuth10 from "@/hooks/withAuth10";
import withAuth from "@/hooks/withAuth";

const Index: FC<{}> = () => {
	useEffect(()=> {
		const reportServices = new Reports();
		reportServices.getReports()
	}, []);
	
	const {reports} = useSelector((state: RootState)=>state.user)
	console.log(reports);
	
	return (
		<Main breadcrumbs={<Breadcrumbs />}>
			<ReportStats />
			<div className="mx-10 pb-28">
				<ChartStats
					rightComponent={
						<div className="md:col-span-4 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm">
							<header className="flex justify-between w-full p-2 mb-2">
								<h1 className="font-medium text-afruna-blue text-[12px] md:text-sm">
									Visitors
								</h1>
							</header>
							{reports?.visitors?(<ResponsiveContainer
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
							</ResponsiveContainer>) : (<div className="items-center flex-col flex text-afruna-blue text-sm"><h2 className="text-lg">No visitors yet!</h2>
									<p className="mt-5">Try featuring for recommendation from Admin.</p>
							</div>)}
							
						</div>
					}
				/>
				<BestSellingProductsTable />
			</div>
		</Main>
	);
};

export default withAuth(Index);
