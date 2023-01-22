import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContainer } from "./container.types";

const initialState: IContainer = {
  logoutModal: false,
  activeConversation: "",
  deleteConversationModal: false,
};

const containerSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    handleLogoutModal: (state: IContainer, action: PayloadAction<boolean>) => {
      state.logoutModal = action.payload;
    },
    setActiveConversation: (
      state: IContainer,
      action: PayloadAction<string>
    ) => {
      state.activeConversation = action.payload;
    },
    setDeleteConversationModal: (
      state: IContainer,
      action: PayloadAction<boolean>
    ) => {
      state.deleteConversationModal = action.payload;
    },
  },
});

export default containerSlice.reducer;
export const {
  handleLogoutModal,
  setActiveConversation,
  setDeleteConversationModal,
} = containerSlice.actions;
