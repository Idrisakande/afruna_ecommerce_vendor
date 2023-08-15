import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./features/auth.slice";
import productsReducer from "./features/products.slice";
import userReducer from "./features/user.slice";

// local storage configuration
const config = {
	key: "root",
	storage,
};

//every reducers combined
const rootReducer = combineReducers({
	auth: authReducer,
	products: productsReducer,
	user: userReducer,
});
const persistedReducer = persistReducer(config, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

const persitor = persistStore(store);

export default {
	persitor,
	store,
};
