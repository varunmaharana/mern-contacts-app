import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    userInfo: undefined,
};

const userInfoReducer = createReducer(initialState, {
    addUserInfo: (state, action) => {
        state.userInfo = action.payload;
    },
    removeUserInfo: (state, action) => {
        state.userInfo = undefined;
    },
});

export default userInfoReducer;