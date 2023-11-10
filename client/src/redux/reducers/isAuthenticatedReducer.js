import { createReducer } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { USER_AUTH_TOKEN } from "../../core";

const initialState = {
    isAuthenticated: Cookies.get(USER_AUTH_TOKEN) ? true : false,
}

const isAuthenticatedReducer = createReducer(initialState ,{
    authorize: (state, action) => {
        state.isAuthenticated = true;
        console.log(state.isAuthenticated);

    },
    unauthorize: (state, action) => {
        state.isAuthenticated = false;
        console.log(state.isAuthenticated);
    },
});

export default isAuthenticatedReducer;