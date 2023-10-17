import { memo, useCallback, useContext, useEffect, useState } from "react";

import {
	IOrderContext,
	OrdersContext,
	OrdersProvider,
} from "@/contexts/OrdersProvider";
import { OrderTable } from "@/components/widgets/tables/OrderTable";
import Order from "@/services/order.service";
import withAuth10 from "@/hooks/withAuth10";
// import { IOrederContext } from "@/interfaces/tables.interface";

export default withAuth10(function Index() {
	useEffect(() => {
		const ordersServices = new Order();
	},[])
	return (
		<OrdersProvider>
			<main className="m-6 pb-20">
				<OrdersFilter />
				<OrderTable />
			</main>
		</OrdersProvider>
	);
})
const OrdersFilter = memo(() => {
	const { selectedFilter, handleActiveFilter } = useContext(
		OrdersContext,
	) as IOrderContext;
	return (
		<div className="flex items-center space-x-8 p-3">
			{[
				"All Orders",
				"Pending",
				"Shipped",
				"Delivered",
				"Cancelled",
				"Returned",
			].map((item, idx) => (
				<button
					className={`${
						selectedFilter === item &&
						"text-afruna-gold/50 border-b border-b-afruna-gold/50"
					} text-afruna-blue text-[12px] md:text-xs font-bold `}
					key={idx}
					onClick={() => handleActiveFilter(item)}
				>
					{item}
				</button>
			))}
		</div>
	);
});
