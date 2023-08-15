import { IProduct } from "@/interfaces/IProductItem";
import { IProducts } from "@/interfaces/tables.interface";
import store from "@/redux/store";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";

class Products {
	protected store = store.store;
	constructor() {}
	async createProduct(product: IProduct) {
		try {
			const { data } = await axios.post("/api/products", product, {
				headers: {
					Authorization: `Bearer ${this.store.getState().auth.token}`,
				},
			});
			return data;
		} catch (error) {
			handleAuthErrors(error as AxiosError);
		}
	}
}
export default Products;
