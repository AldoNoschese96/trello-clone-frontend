//Api
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signUp } from "../../api/requests";

export const loginHandler = createAsyncThunk("users/signin", async (data) => {
  const response = await login(data);
  await localStorage.setItem("token", response.token);
  return response;
});

export const signUpHandler = createAsyncThunk("users/signup", async (data) => {
  const response = await signUp(data);
  await localStorage.setItem("token", response.token);
  return response;
});
