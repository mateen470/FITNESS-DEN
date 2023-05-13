import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DietPlanRequestsLength: 0,
  WorkoutPlanRequestsLength: 0,
  DietPlanUpdateRequestsLength: 0,
  WorkoutPlanUpdateRequestsLength: 0,
  isNewWorkoutPlanRequests: false,
  isNewDietPlanRequests: false,
  isNewWorkoutPlanUpdateRequests: false,
  isNewDietPlanUpdateRequests: false,
};

export const CheckForNewPlanRequestsSlice = createSlice({
  name: "CheckForNewPlanRequests",
  initialState,
  reducers: {
    setIsNewWorkoutPlanRequests: (state, action) => {
      state.isNewWorkoutPlanRequests = action.payload;
    },
    setIsNewDietPlanRequests: (state, action) => {
      state.isNewDietPlanRequests = action.payload;
    },
    setIsNewWorkoutPlanUpdateRequests: (state, action) => {
      state.isNewWorkoutPlanUpdateRequests = action.payload;
    },
    setIsNewDietPlanUpdateRequests: (state, action) => {
      state.isNewDietPlanUpdateRequests = action.payload;
    },
    setWorkoutPlanRequestsLength: (state, action) => {
      state.WorkoutPlanRequestsLength = action.payload;
    },
    setDietPlanRequestsLength: (state, action) => {
      state.DietPlanRequestsLength = action.payload;
    },
    setWorkoutPlanUpdateRequestsLength: (state, action) => {
      state.WorkoutPlanUpdateRequestsLength = action.payload;
    },
    setDietPlanUpdateRequestsLength: (state, action) => {
      state.DietPlanUpdateRequestsLength = action.payload;
    },
  },
});

export const {
  setIsNewWorkoutPlanRequests,
  setIsNewDietPlanRequests,
  setIsNewWorkoutPlanUpdateRequests,
  setIsNewDietPlanUpdateRequests,
  setWorkoutPlanRequestsLength,
  setDietPlanRequestsLength,
  setWorkoutPlanUpdateRequestsLength,
  setDietPlanUpdateRequestsLength,
} = CheckForNewPlanRequestsSlice.actions;

export default CheckForNewPlanRequestsSlice.reducer;
