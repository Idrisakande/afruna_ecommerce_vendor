// export default Transactions;
import axios, { AxiosError } from "axios";
import { TErrorResponse, TSuccessResponse } from "@/types/auth.type";
import {
	IConfirmBankDetailsResponse,
	IConfirmankDetails,
	ISetBankDetails,
	ITransaction,
} from "@/interfaces/ITransaction";
import {
	setBanks,
	setSingleTransaction,
	setTransactions,
	setWallet,
} from "@/redux/features/app/transaction_slice";
import { toast } from "react-toastify";
import { handleAuthErrors, handleTransactionErrors } from "../utils/auth.util";
import { setTotalPages } from "@/redux/features/app/utils_slice";
import { T_store } from "@/types/store.type";
import store from "@/redux/store";
import Cookies from "js-cookie";

export default class Transaction {
	private store: T_store;

	constructor() {
		this.store = store.store;
		this.getBanks();
		this.getTransactions();
		this.getWalletDetails();
	}

	async getWalletDetails() {
		try {
			const { data } = await axios.get<TSuccessResponse<any>>(
				"/api/wallets",
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);

			this.store.dispatch(setWallet(data.data));
			sessionStorage.setItem(
				"account",
				JSON.stringify(data.data.accounts[0]),
			);
		} catch (error) {
			handleTransactionErrors(error as AxiosError<TErrorResponse>);
		}
	}

	async getTransactions(page: number = 1) {
		try {
			const { data } = await axios.get<TSuccessResponse<ITransaction[]>>(
				`/api/transactions?page${page}`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			this.store.dispatch(setTransactions(data.data));
		} catch (error) {
			handleTransactionErrors(error as AxiosError<TErrorResponse>);
		}
	}

	async getTransaction(transactionId: any) {
		try {
			const { data } = await axios.get<TSuccessResponse<ITransaction>>(
				`/api/transactions/${transactionId}`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			this.store.dispatch(setSingleTransaction(data.data));
			this.store.dispatch(setTotalPages(data.totalPages));
		} catch (error) {
			handleTransactionErrors(error as AxiosError<TErrorResponse>);
		}
	}

	async getBanks() {
		try {
			const { data } = await axios.get<TSuccessResponse<any>>(
				"/api/wallets/bank",
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			this.store.dispatch(setBanks(data.data));
			sessionStorage.setItem("banks", JSON.stringify(data.data));
		} catch (error) {
			handleTransactionErrors(error as AxiosError<TErrorResponse>);
		}
	}

	async confirmBankDetails(payload: IConfirmankDetails) {
		try {
			const { data } = await axios.post<
				TSuccessResponse<IConfirmBankDetailsResponse>
			>("/api/wallets/bank/confirm", payload, {
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});

			return data;
		} catch (error) {
			return error;
		}
	}

	async setBankDetails(payload: ISetBankDetails) {
		try {
			const { data } = await axios.post<TSuccessResponse<any>>(
				"/api/wallets/bank",
				payload,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			return data;
		} catch (error) {
			handleTransactionErrors(error as AxiosError<TErrorResponse>);
		}
	}

	async withdraw(payload: { accountId: string; amount: number }) {
		try {
			const { data } = await axios.post<TSuccessResponse<any>>(
				"/api/wallets/withdraw",
				payload,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				},
			);
			return data;
		} catch (error) {
			return error;
		}
	}
}
