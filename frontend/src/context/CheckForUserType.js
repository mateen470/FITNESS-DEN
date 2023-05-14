import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isTrainer: false,
  isUser: false,
};

export const CheckForUserTypeSlice = createSlice({
  name: "CheckForUserType",
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsTrainer: (state, action) => {
      state.isTrainer = action.payload;
    },
    setIsUser: (state, action) => {
      state.isUser = action.payload;
    },
  },
});

export const { setIsAdmin, setIsTrainer, setIsUser } =
  CheckForUserTypeSlice.actions;

export default CheckForUserTypeSlice.reducer;
