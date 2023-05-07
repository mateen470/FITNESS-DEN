import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SelectedPlanToBuy: {},
};

export const SelectedPlanSlice = createSlice({
  name: "SelectedPlan",
  initialState,
  reducers: {
    SetSelectedPlanToBuy: (state, action) => {
      state.SelectedPlanToBuy = action.payload;
    },
  },
});

export const { SetSelectedPlanToBuy } = SelectedPlanSlice.actions;

export default SelectedPlanSlice.reducer;
