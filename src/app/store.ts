import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../feature/api/apiSlice";
import authSlice from "../feature/auth/authSlice";
import containerSlice from "../feature/container/containerSlice";
import userSlice from "../feature/user/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    container: containerSlice,
    users: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getdefauldMiddleware) =>
    getdefauldMiddleware().concat(apiSlice.middleware),
});
