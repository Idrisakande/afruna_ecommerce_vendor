import axios, { AxiosError } from "axios";

import { IProduct } from "@/interfaces/IProductItem";
import { IProducts } from "@/interfaces/tables.interface";
import store from "@/redux/store";
import { T_app_provider } from "@/types/t";
import { handleAuthErrors } from "@/utils/auth.util";
import Cookies from "js-cookie";
import { updateCategories } from "@/redux/features/categories.slice";
import { updateProducts } from "@/redux/features/products.slice";
import { T_error_response } from "@/types/auth.type";
import { toast } from "react-toastify";

class Products {
	protected store = store.store;
	constructor(opt?: T_app_provider) {
		opt?.setIsloading && opt.setIsloading(true);
		this.getCategories().then(
			() => opt?.setIsloading && opt.setIsloading(false),
		);
		this.getProducts().then(
			() => opt?.setIsloading && opt.setIsloading(false),
		);
	}
	async createProduct(product: IProduct, opt: T_app_provider) {
		const { setIsloading } = opt;
		setIsloading && setIsloading(true);
		try {
			const { data } = await axios.post("/api/products", product, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			toast.success("Product successfully created!");
			return data;
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		} finally {
			setIsloading && setIsloading(false);
		}
	}
	async deleteproduct(id: string) {
		try {
			const { data } = await axios.delete("/api/products/" + id, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			this.getProducts();
			toast.success("Product removed!");
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	private async getProducts() {
		try {
			const { data } = await axios.get("/api/products/vendor", {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			});
			const products: IProduct[] = data.data;
			if (products.length) {
				const sortedProducts = data.data.sort(
					(a: IProduct, b: IProduct) =>
						new Date(a.createdAt as string).getDate() -
						new Date(b.createdAt as string).getDate(),
				);
				
				this.store.dispatch(updateProducts(sortedProducts));
			} else {
				console.log(products);
				this.store.dispatch(updateProducts(products));
			}
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	private async getCategories() {
		try {
			const { data } = await axios.get("/api/categories", {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});

			this.store.dispatch(updateCategories(data.data));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
}
export default Products;
