import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse, IUser } from "./auth.types";

export interface IAuth {
  user: IUser | undefined;
  authToken: string;
}
const initialState: IAuth = {
  user: undefined,
  authToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state: IAuth, action: any) => {
      const payload: ILoginResponse = action.payload;
      state.authToken = payload.token;
      state.user = payload.user;
    },
    userLoggedOut: (state: IAuth, action) => {
      state.authToken = "";
      state.user = undefined;
    },
    setLoggedInUserOnlineStatus: (
      state: IAuth,
      action: PayloadAction<{
        userId: string;
        online: boolean;
        lastActive: string;
      }>
    ) => {
      if (state.user?._id === action.payload.userId) {
        state.user.online = action.payload.online;
        state.user.lastActive = action.payload.lastActive;
      }
    },
  },
});

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut, setLoggedInUserOnlineStatus } =
  authSlice.actions;
