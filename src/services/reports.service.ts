import { updateReports } from "@/redux/features/user.slice";
import store from "@/redux/store";
import { T_error_response } from "@/types/auth.type";
import { T_store } from "@/types/store.type";
import { handleAuthErrors } from "@/utils/auth.util";
import axios, { AxiosError } from "axios";

class Reports {
	protected store!: T_store;
	constructor() {
		this.store = store.store;
	}
    async getReports(){
        try {
            
            const {data} = await axios.get("/api/products/report");
            this.store.dispatch(updateReports(data.data))
        } catch (error) {
         handleAuthErrors(error as AxiosError<T_error_response>)   
        }
    }
}
export default Reports;