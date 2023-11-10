import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import isAuthenticatedReducer from "./reducers/isAuthenticatedReducer";
import userInfoReducer from "./reducers/userInfoReducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  isAuthenticatedReducer: isAuthenticatedReducer,
  userInfoReducer: userInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;