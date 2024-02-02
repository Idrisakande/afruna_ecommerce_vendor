import axios, { AxiosError } from "axios";

import { IProduct } from "@/interfaces/IProductItem";
import store from "@/redux/store";
import { T_app_provider } from "@/types/t";
import { handleAuthErrors } from "@/utils/auth.util";
import Cookies from "js-cookie";
import { updateCategories } from "@/redux/features/categories.slice";
import {
	updateProdouctsWithReviews,
	updateProducts,
} from "@/redux/features/products.slice";
import { T_error_response } from "@/types/auth.type";
import { toast } from "react-toastify";
import { productsWithReviews } from "@/utils/products_with_reviews";
import { T_review } from "@/types/user.type";
import { T_product_reviews } from "@/components/products/ProductReviews";

class Products {
	protected store = store.store;
	constructor(opt?: T_app_provider) {
		opt?.setIsloading && opt.setIsloading(true);
		this.getCategories().then(
			() => opt?.setIsloading && opt.setIsloading(false),
		);
		this.getProducts();
		this.getProductsWithReviews();
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
			this.getProducts();
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
	async updateProduct(id: string, payload: any, opt: T_app_provider) {
		const { setIsloading } = opt;
		setIsloading && setIsloading(true);
		try {
			const { data } = await axios.put("/api/products/" + id, payload, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});

			toast.info("Update successfully!");
			this.getProducts();
			return data.data;
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		} finally {
			setIsloading && setIsloading(true);
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
				this.store.dispatch(updateProducts(products));
			}
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	getProductsWithReviews() {
		const products = this.store.getState().products.products;
		const reviews = this.store.getState().user.reviews as T_review[];
		const PWR = productsWithReviews<T_product_reviews>(products, reviews);
		this.store.dispatch(
			updateProdouctsWithReviews(PWR as unknown as T_product_reviews[]),
		);
		return PWR;
	}
	private async getCategories() {
		try {
			const { data } = await axios.get("/api/categories?limit=100", {
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
