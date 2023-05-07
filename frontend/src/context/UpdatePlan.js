import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UpdatePlan: {},
  WorkoutPlanToUpdate: {},
  DietPlanId: "",
};

export const UpdatePlanSlice = createSlice({
  name: "UpdatePlan",
  initialState,
  reducers: {
    FetchPlan: (state, action) => {
      state.UpdatePlan = action.payload;
    },
    FetchWorkoutPlanToUpdate: (state, action) => {
      state.WorkoutPlanToUpdate = action.payload;
    },
    GetDietPlanId: (state, action) => {
      state.DietPlanId = action.payload;
    },
  },
});
export const { FetchPlan, GetDietPlanId, FetchWorkoutPlanToUpdate } =
  UpdatePlanSlice.actions;

export default UpdatePlanSlice.reducer;
