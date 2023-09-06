import axios, { AxiosError } from "axios";

import store from "@/redux/store";
import { handleAuthErrors } from "@/utils/auth.util";
import Cookies from "js-cookie";
import { T_error_response } from "@/types/auth.type";
import {
	updateDailyRevenueVsOrder,
	updateMonthlyRevenueVsOrder,
	updateOrder,
	updateWeeklyRevenueVsOrder,
	updateYealyRevenueVsOrder,
} from "@/redux/features/user.slice";
import { T_order, T_updated_order } from "@/types/user.type";
import recent_itemsUtil from "@/utils/recent_items.util";

class Dashboard {
	private store = store.store;
	constructor() {
		this.getDailyRevenueVsOrder();
		this.getMonthlyRevenueVsOrder();
		this.getWeeklyRevenueVsOrder();
		this.getYearlyRevenueVsOrder();
		this.getOrders();
	}

	async getDashboardStats() {
		try {
			const { data } = await axios.get("/api/products/cards", {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			return data.data;
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	getRecentOrder() {
		const { orders } = this.store.getState().user;
		//get recent orders by date;
		const recent_orders: T_updated_order[] = recent_itemsUtil(orders, 12);
		return recent_orders;
	}
	private async getMonthlyRevenueVsOrder() {
		try {
			const { data } = await axios.get("/api/products/table/monthly", {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			this.store.dispatch(updateMonthlyRevenueVsOrder(data.data));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	private async getDailyRevenueVsOrder() {
		try {
			const { data } = await axios.get("/api/products/table/daily", {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			this.store.dispatch(updateDailyRevenueVsOrder(data.data));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	private async getWeeklyRevenueVsOrder() {
		try {
			const { data } = await axios.get("/api/products/table/weekly", {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			this.store.dispatch(updateWeeklyRevenueVsOrder(data.data));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	private async getYearlyRevenueVsOrder() {
		try {
			const { data } = await axios.get("/api/products/table/yearly", {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			this.store.dispatch(updateYealyRevenueVsOrder(data.data));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	private async getOrders() {
		try {
			const { data } = await axios.get("/api/orders?role=vendor", {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			const orders: T_order[] = data.data;
			const newOrders: T_updated_order[] = [];
			if (!orders.length) {
				this.store.dispatch(updateOrder(orders));
			} else {
				const { products } = this.store.getState().products;
				for (let i of orders) {
					for (let j of products) {
						if (i.productId === j._id) {
							newOrders.push({ ...i, coverPhoto: j.coverPhoto, productName:j.name });
						}
					}
				}
				this.store.dispatch(updateOrder(newOrders));
			}
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
}
export default Dashboard;
