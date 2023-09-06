// "use client";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.css";
import redux from "@/redux/store";
import AppProvider from "@/contexts/AppProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={redux.store}>
			<PersistGate loading={null} persistor={redux.persitor}>
				<AppProvider>
					<ToastContainer />
					<Component {...pageProps} />
				</AppProvider>
			</PersistGate>
		</Provider>
	);
}
