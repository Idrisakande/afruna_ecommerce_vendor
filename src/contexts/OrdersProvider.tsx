import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { orderData } from "@/constants/data";
import { IOrder, IOrederContext } from "@/interfaces/tables.interface";
import { Main } from "@/layouts/Main";
import { RootState } from "@/types/store.type";
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from "react";

interface OrdersProviderProps {
	children: ReactNode;
}

export interface IOrderContext {
	selectedFilter: string;
	handleActiveFilter: (arg: string) => void;
}

export const OrdersContext = createContext<IOrderContext | null>(null);

export const OrdersProvider: FC<OrdersProviderProps> = ({ children }) => {
	const [selectedFilter, setSelectedFilter] = useState("All Orders");
	
	const handleActiveFilter = useCallback(
		(item: string) => setSelectedFilter(item),
		[],
	);
	return (
		<OrdersContext.Provider value={{ handleActiveFilter, selectedFilter }}>
			<Main breadcrumbs={<Breadcrumbs />}>{children}</Main>
		</OrdersContext.Provider>
	);
};
