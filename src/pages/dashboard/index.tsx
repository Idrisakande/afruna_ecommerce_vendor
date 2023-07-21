/* eslint-disable react/display-name */
import { Main } from "@/layouts/Main";

import { MdAdd } from "react-icons/md";

import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { DashboardStats } from "@/components/DashboardStats";
import { ChartStats } from "@/components/ChartStats";
import { RecentOrders } from "@/components/RecentOrders";
import { ProductListView } from "@/components/ProductListView";
import { CreateBtn } from "@/components/widgets/CreateBtn";
import { ReviewsSlide } from "@/components/ReviewsSlide";

const Index = () => {
	return (
		<Main
			breadcrumbs={<Breadcrumbs />}
			asideComponent={
				<CreateBtn
					placeholder="Create Product"
					prefixIcon={<MdAdd />}
				/>
			}
		>
			<main className="my-8 m-12 pb-20">
				<DashboardStats />
				<ChartStats
					rightComponent={
						<div className="md:col-span-4 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm h-[50vh]">
							<header className="p-2 mb-2">
								<h1 className="font-bold text-afruna-blue text-[12px] md:text-sm">
									Recent Reviews
								</h1>
							</header>
							<ReviewsSlide />
						</div>
					}
				/>
				<RecentOrders />
				<ProductListView />
			</main>
		</Main>
	);
};
export default Index;
