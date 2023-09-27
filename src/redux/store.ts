import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./features/auth.slice";
import chatReducer from "./features/chat.slice";
import categoriesReducer from "./features/categories.slice";
import productsReducer from "./features/products.slice";
import userReducer from "./features/user.slice";
import transactionsReducer from "./features/transactions.slice";

// local storage configuration
const config = {
	key: "root",
	storage,
};

//every reducers combined
const rootReducer = combineReducers({
	auth: authReducer,
	categories: categoriesReducer,
	products: productsReducer,
	transactions: transactionsReducer,
	user: userReducer,
	chat:chatReducer,
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
