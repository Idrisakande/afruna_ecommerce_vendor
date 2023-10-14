import axios, { AxiosError, AxiosResponse } from "axios";

import {
	setUserBio,
	updateRecentReviewers,
	updateReviewers,
	updateReviews,
	updateUsers,
	updateUsersWithReviews,
} from "@/redux/features/user.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { handleAuthErrors } from "@/utils/auth.util";
import Cookies from "js-cookie";
import { T_User, T_review, T_user } from "@/types/user.type";
import recent_itemsUtil from "@/utils/recent_items.util";
import { toast } from "react-toastify";
import { usersWithReviews } from "@/utils/users_with_rewiews";

class User {
	private store = store.store;
	constructor() {
		this.getUsersWithReviews();
	}
	async getReviews() {
		try {
			const { products } = this.store.getState().products;
			/**
			 * Get the list of reviews by product @_id {string}
			 * @update {Array} when the review by product @_id is not empty
			 */
			const product_reviews = [];
			const reviews: T_review[] = [];
			const recent_reviewers = [];
			const reviewers = [];
			for (let i in products) {
				const data = await this.getReveiwsByProductId(products[i]._id);
				if (data.length > 0) {
					product_reviews.push(data);
				}
			}
			for (let i in product_reviews) {
				reviews.push(...product_reviews[i]); //extracting all child items for every iteration
			}
			const recent = recent_itemsUtil(reviews, 7) as T_review[]; //get the most recent last 7 days;
			for (let i in recent) {
				const uuid = recent[i].userId; //get recents user data base on the reviews;
				const user = await this.getUserById(uuid._id);
				recent_reviewers.push(user);
			}
			for (let i in reviews) {
				const uuid = reviews[i].userId;
				const user = await this.getUserById(uuid._id);
				reviewers.push(user);
			}

			this.store.dispatch(updateReviewers(reviewers));
			this.store.dispatch(updateRecentReviewers(recent_reviewers));
			this.store.dispatch(updateReviews(recent));
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	// async updatePassword(payload) {

	// }

	async getUsersWithReviews() {
		const users = await this.getAllUsers();
		const reviews = this.store.getState().user?.reviews
		if (users && reviews) {
			const UWR = usersWithReviews(users, reviews) as (T_User & {
				reviews: T_review[];
			})[];
			this.store.dispatch(updateUsersWithReviews(UWR));
		}
	}

	async getAllUsers() {
		try {
			const { data } = await axios.get<AxiosResponse<T_User[]>>("/api/users?limit=100", {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				}
			});
			this.store.dispatch(updateUsers(data.data))
			return data.data;
		} catch (error) {
			
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}

	private async getReveiwsByProductId(id: string) {
		try {
			const { data } = await axios.get("/api/reviews/" + id, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			return data.data;
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	async getUserById(id: string) {
		try {
			const { data } = await axios.get(`/api/users/${id}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			return data.data;
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	async updateMe(payload: any) {
		try {
			const { data } = await axios.put("/api/users/me", payload, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});

			this.store.dispatch(setUserBio(data.data));
			toast.success("Profile updated successfully!");
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
	async resetPassword(payload: any) {
		try {
			const { data } = await axios.put("/api/password", payload, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			toast.success("Password updated successfully!");
		} catch (error) {
			handleAuthErrors(error as AxiosError<T_error_response>);
		}
	}
}
export default User;
