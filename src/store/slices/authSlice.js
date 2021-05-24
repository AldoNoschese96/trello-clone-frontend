import { createSlice } from "@reduxjs/toolkit";

//Auth Slice Actions
import * as ACTIONS from "../actions/authSliceActions";

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
    logOut: (state, action) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [ACTIONS.loginHandler.pending]: (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    },
    [ACTIONS.loginHandler.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    [ACTIONS.loginHandler.rejected]: (state, { meta, error }) => {
      state.error = "Auth Failed";
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    [ACTIONS.signUpHandler.pending]: (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    },
    [ACTIONS.signUpHandler.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    [ACTIONS.signUpHandler.rejected]: (state, { meta, error }) => {
      state.error = "Could Not Create an account";
      state.isLoading = false;
      state.isLoggedIn = false;
    },
  },
});

export const { clearError, logOut } = authSlice.actions;
export default authSlice.reducer;
