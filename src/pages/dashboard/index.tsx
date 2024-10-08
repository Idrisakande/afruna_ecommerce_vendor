import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Main } from "@/layouts/Main";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import PreLoader from "@/components/widgets/PreLoader";
import { DashboardStats } from "@/components/DashboardStats";
import { ChartStats } from "@/components/ChartStats";
import { RecentOrders } from "@/components/RecentOrders";
import { ProductListView } from "@/components/ProductListView";
import { CreateBtn } from "@/components/widgets/CreateBtn";
import { ReviewsSlide } from "@/components/ReviewsSlide";

import Order from "@/services/order.service";
import { AppContext } from "@/contexts/AppProvider";
import { T_app_provider } from "@/types/t";
import { T_DashboardStats } from "@/types/user.type";
import PageLoarder from "@/components/widgets/PageLoarder";
import User from "@/services/user.service";
import Products from "@/services/products.service";
import withAuth from "@/hooks/withAuth";
const Index = () => {
	const [isloading, setIsloading] = useState(true);
	const [dashboardStats, setDashboardStats] = useState<T_DashboardStats>({
		canceledOrders: 0,
		listedProducts: 0,
		shippedOrders: 0,
		totalOrders: 0,
	});
	const router = useRouter();
	useEffect(() => {
		const userService = new User();
		userService.getReviews();
	}, []);

	useEffect(() => {
		const orderServices = new Order();
		const _ = new Products();
		orderServices
			.getOrderStats()
			.then((result) => setDashboardStats(result))
			.then(() => setIsloading(false));
	}, []);
	return (
		<Main
			breadcrumbs={<Breadcrumbs />}
			asideComponent={
				<CreateBtn
					createProduct={() => router.push("/products")}
					placeholder="Create Product"
					prefixIcon={<MdAdd />}
				/>
			}
		>
			<main className="my-8 m-12 pb-20">
				<DashboardStats {...dashboardStats} />
				<ChartStats
					rightComponent={
						<div className="md:col-span-4 col-span-12 bg-white p-2 rounded-lg border-[1px] shadow-sm">
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
export default withAuth(Index);
