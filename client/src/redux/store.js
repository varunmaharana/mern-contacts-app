import { configureStore } from "@reduxjs/toolkit";
import isAuthenticatedReducer from "./reducers/isAuthenticatedReducer";

const store = configureStore({
  reducer: {
    isAuthenticatedReducer: isAuthenticatedReducer,
  }
});

export default store;