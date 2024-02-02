import axios, { AxiosError, AxiosResponse } from "axios";

import store from "@/redux/store";
import { handleAuthErrors } from "@/utils/auth.util";
import Cookies from "js-cookie";
import { T_error_response } from "@/types/auth.type";
import {
	updateDailyRevenueVsOrder,
	updateMonthlyRevenueVsOrder,
	updateOrder,
	updateOrderBySessionId,
	updateWeeklyRevenueVsOrder,
	updateYealyRevenueVsOrder,
} from "@/redux/features/user.slice";
import {
	T_order,
	T_orderBySessionId,
	T_updated_order,
	T_updated_user_order,
	T_user_order,
} from "@/types/user.type";
import recent_itemsUtil from "@/utils/recent_items.util";
import { T_store } from "@/types/store.type";
import { IOrder } from "@/interfaces/tables.interface";

class Order {
	protected store!: T_store;
	constructor() {
		this.store = store.store;
		this.getDailyRevenueVsOrder();
		this.getMonthlyRevenueVsOrder();
		this.getWeeklyRevenueVsOrder();
		this.getYearlyRevenueVsOrder();
		this.getOrders();
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
	async getOrdersBySessionId(id:string) {
		try {
			const { data } = await axios.get<AxiosResponse<T_orderBySessionId[]>>("/api/orders/"+id, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			this.store.dispatch(updateOrderBySessionId(data.data));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	
	}
	async getOrders() {
		try {
			const { data } = await axios.get<AxiosResponse<T_order[]>>("/api/orders", {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			const orders: T_order[] = data.data.filter(order => order.productId !== null);

			this.store.dispatch(updateOrder(orders));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	
}
export default Order;
