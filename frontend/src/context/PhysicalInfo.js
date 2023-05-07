import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PhysicalInfo: {},
};

export const PhysicalInfoSlice = createSlice({
  name: "PhysicalInfo",
  initialState,
  reducers: {
    AddPhysicalInfo: (state, action) => {
      state.PhysicalInfo = action.payload;
    },
  },
});

export const { AddPhysicalInfo } = PhysicalInfoSlice.actions;

export default PhysicalInfoSlice.reducer;
