import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
}

const isAuthenticatedReducer = createReducer(initialState ,{
    authorize: (state, action) => {
        state.isAuthenticated = true;
    },
    unauthorize: (state, action) => {
        state.isAuthenticated = false;
    },
});

export default isAuthenticatedReducer;