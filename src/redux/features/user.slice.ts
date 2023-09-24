import {
	T_InitialUserState,
	T_User,
	T_order,
	T_reports,
	T_review,
	T_updated_order,
	T_updated_user_order,
	T_user,
	T_user_order,
} from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const User = createSlice({
	initialState: {
		isActive: false,
		bio_data: undefined,
		reviews: [],
		reviewers: [],
		recent_reviewers: [],
		revenue_vs_order: {
			daily: [],
			monthly: [],
			weekly: [],
			yearly: [],
		},
		orders: [],
		reports: undefined,
		viewOrder: undefined
	} as T_InitialUserState,
	name: "User",
	reducers: {
		updateUserActiveness(state, action: PayloadAction<boolean>) {
			state.isActive = action.payload;
		},
		setUserBio(state, action: PayloadAction<T_User>) {
			state.bio_data = action.payload;
		},
		updateReviews(state, action: PayloadAction<T_review[]>) {
			state.reviews = action.payload;
		},
		updateReviewers(state, action: PayloadAction<T_user[]>) {
			state.reviewers = action.payload;
		},
		updateRecentReviewers(state, action: PayloadAction<T_user[]>) {
			state.recent_reviewers = action.payload;
		},
		updateDailyRevenueVsOrder(state, action: PayloadAction<[]>) {
			state.revenue_vs_order.daily = action.payload;
		},
		updateWeeklyRevenueVsOrder(state, action: PayloadAction<[]>) {
			state.revenue_vs_order.weekly = action.payload;
		},
		updateMonthlyRevenueVsOrder(state, action: PayloadAction<[]>) {
			state.revenue_vs_order.monthly = action.payload;
		},
		updateYealyRevenueVsOrder(state, action: PayloadAction<[]>) {
			state.revenue_vs_order.yearly = action.payload;
		},
		updateOrder(state, action: PayloadAction<T_order[] | T_user_order[]>) {
			state.orders = action.payload;
		},
		updateReports(state, action: PayloadAction<T_reports>) {
			state.reports = action.payload;
		},
		setViewOrderData(state, action:PayloadAction<T_updated_order|T_updated_user_order>){
			state.viewOrder = action.payload;
		}
	},
});

export const {
	setUserBio,
	updateReviews,
	updateRecentReviewers,
	updateReviewers,
	updateUserActiveness,
	updateDailyRevenueVsOrder,
	updateMonthlyRevenueVsOrder,
	updateWeeklyRevenueVsOrder,
	updateYealyRevenueVsOrder,
	updateOrder,
	updateReports,
	setViewOrderData
} = User.actions;
export default User.reducer;
