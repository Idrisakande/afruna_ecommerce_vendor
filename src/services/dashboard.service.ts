import axios, { AxiosError } from "axios";

import store from "@/redux/store";
import { handleAuthErrors } from "@/utils/auth.util";
import User from "./user.service";

class Dashboard {
	private store = store.store;
	private listedProducts: number = 0;
	constructor() {
		this.init();
	}

	private async init() {
		try {
			const { data } = await axios.get("/api/products", {
				headers: {
					Authorization: `Bearer ${this.store.getState().auth.token}`,
				},
			});
			this.listedProducts = data.data.length;
		} catch (error) {
			handleAuthErrors(error as AxiosError);
		}
	}
	getDashboardStats() {
		return {
			total_products: this.listedProducts,
		};
	}
}
export default Dashboard;
