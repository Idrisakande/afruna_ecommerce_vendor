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
import {
	T_order,
	T_updated_order,
	T_updated_user_order,
	T_user_order,
} from "@/types/user.type";
import recent_itemsUtil from "@/utils/recent_items.util";
import { T_store } from "@/types/store.type";

class Order {
	protected store!: T_store;
	constructor() {
		this.store = store.store;
		this.getDailyRevenueVsOrder();
		this.getMonthlyRevenueVsOrder();
		this.getWeeklyRevenueVsOrder();
		this.getYearlyRevenueVsOrder();
		this.getOrdersByUsers();
	}

	async getOrderStats() {
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
	private async getOrdersByVendor() {
		try {
			const { data } = await axios.get("/api/orders?role=vendor", {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			const orders: T_order[] = data.data;
			/* const newOrders: T_updated_order[] = [];
			if (!orders.length) {
				this.store.dispatch(updateOrder(orders));
			} else {
				const { products } = this.store.getState().products;
				for (let i of orders) {
					for (let j of products) {
						if (i.productId === j._id) {
							newOrders.push({
								...i,
								coverPhoto: j.coverPhoto,
								productName: j.name,
							});
						}
					}
				}
			} */

			this.store.dispatch(updateOrder(orders));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	private async getOrdersByUsers() {
		try {
			const { data } = await axios.get("/api/orders?role=user", {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			const orders: T_user_order[] = data.data;
			
			const updatedOrders: T_updated_user_order[] = [];
			if (!orders.length) {
				this.store.dispatch(updateOrder(orders));
			} else {
				const { products } = this.store.getState().products;
				for (let i of orders) {
					for (let _i_ of i.items) {
						for (let j of products) {
							if (_i_.productId == j._id) {
								updatedOrders.push({
									...i,
									items: [...i.items],
									coverPhoto: j.coverPhoto[0],
									productName: j.name,
								});
							}
						}
					}
				}
				this.store.dispatch(updateOrder(updatedOrders));
			}
			// const newOrders = [];
			// if (!orders.length) {
			// 	this.store.dispatch(updateOrder(orders));
			// } else {
			// 	const { products } = this.store.getState().products;
			// 	for (let i of orders) {
			// 		for (let j of products) {
			// 			if (i.productId === j._id) {
			// 				newOrders.push({
			// 					...i,
			// 					coverPhoto: j.coverPhoto,
			// 					productName: j.name,
			// 				});
			// 			}
			// 		}
			// }
			// this.store.dispatch(updateOrder(orders));
			// 	}
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
}
export default Order;
