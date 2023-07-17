import { useCallback, useState } from "react";

import { OrdersProvider } from "@/contexts/OrdersProvider";
import { OrderTable } from "@/components/widgets/tables/OrderTable";
// import { IOrederContext } from "@/interfaces/tables.interface";

export default function Index() {
	const [selected, setSelected] = useState("");
	const handleActive = useCallback((item: string) => setSelected(item), []);
	return (
		<OrdersProvider>
			<main className="m-6 pb-20">
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
								selected === item &&
								"text-afruna-gold/50 border-b border-b-afruna-gold/50"
							} text-afruna-blue text-[12px] md:text-xs font-bold `}
							key={idx}
							onClick={() => handleActive(item)}
						>
							{item}
						</button>
					))}
				</div>
				<OrderTable />
			</main>
		</OrdersProvider>
	);
}
