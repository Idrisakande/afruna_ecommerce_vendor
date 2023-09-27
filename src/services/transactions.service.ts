import { updateTransactions } from "@/redux/features/transactions.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

class Transactions {
    store = store.store;
    constructor() {
        this.getAllTransactions().then((result)=> this.store.dispatch(updateTransactions(result)))
    }
    protected async getAllTransactions() {
        try {
            const { data } = await axios.get("/api/transactions", { headers: { "Authorization": `Bearer ${Cookies.get("token")}` } })
            return data.data;
        } catch (error) {
            handleAuthErrors(error as AxiosError<T_error_response>)
        }
    }
}

export default Transactions;