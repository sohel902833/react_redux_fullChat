import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../auth/auth.types";

export interface IUserSlice {
  length: number;
  next: {
    page: number;
    limit: number;
  };
  previous: {
    page: number;
    limit: number;
  };
  data: null | IUser[];
}
const initialState: IUserSlice = {
  length: 0,
  next: {
    limit: 0,
    page: 0,
  },
  previous: {
    limit: 0,
    page: 0,
  },
  data: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state: IUserSlice, action: PayloadAction<IUserSlice>) => {
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      if (action.payload.previous.page === 0) {
        state.data = action.payload.data;
      } else {
        state.data = [
          ...(state.data as IUser[]),
          ...(action.payload.data as IUser[]),
        ];
      }
      state.length = action.payload.length;
    },
    changeUserStatus: (
      state: IUserSlice,
      action: PayloadAction<{
        userId: string;
        online: boolean;
        lastActive: string;
      }>
    ) => {
      if (state?.data && state?.data?.length > 0) {
        state.data = state.data?.map((user) => {
          if (user?._id === action.payload.userId) {
            return {
              ...user,
              online: action.payload.online,
              lastActive: action.payload.lastActive,
            };
          }
          return user;
        });
      }
    },
  },
});

export default userSlice.reducer;
export const { setUsers, changeUserStatus } = userSlice.actions;
