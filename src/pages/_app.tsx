// "use client";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import redux from "@/redux/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persitor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
