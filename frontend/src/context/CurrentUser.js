import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CurrentUserID: "",
};

export const CurrentUserSlice = createSlice({
  name: "CurrentUser",
  initialState,
  reducers: {
    AddCurrentUserId: (state, action) => {
      state.CurrentUserID = action.payload;
    },
  },
});

export const { AddCurrentUserId } = CurrentUserSlice.actions;

export default CurrentUserSlice.reducer;
