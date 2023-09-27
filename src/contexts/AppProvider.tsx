import { ReactNode, createContext, useState } from "react";

import { T_app_provider } from "@/types/t";

export const AppContext = createContext<T_app_provider | null>(null);

export default function AppProvider(props: { children: ReactNode }) {
	const [isLoading, setIsloading] = useState(false);
	return (
		<AppContext.Provider value={{ isLoading, setIsloading }}>
			{props.children}
		</AppContext.Provider>
	);
}
