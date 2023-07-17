/* eslint-disable react/display-name */
import { Main } from "@/layouts/Main";

import { MdAdd } from "react-icons/md";

import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { DashboardStats } from "@/components/DashboardStats";
import { ChartStats } from "@/components/ChartStats";
import { RecentOrders } from "@/components/RecentOrders";
import { ProductListView } from "@/components/ProductListView";
import { CreateBtn } from "@/components/widgets/CreateBtn";

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
				<ChartStats />
				<RecentOrders />
				<ProductListView />
			</main>
		</Main>
	);
};
export default Index;
