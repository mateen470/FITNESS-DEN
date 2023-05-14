import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  Plan: [],
  WeeklyPlan: [],
};

export const PlanSlice = createSlice({
  name: "Plan",
  initialState,
  reducers: {
    AddWeeklyPlan: (state, action) => {
      state.WeeklyPlan = [...state.WeeklyPlan, action.payload];
    },
    EmptyWeeklyPlan: (state) => {
      state.WeeklyPlan = [];
    },
    AddPlan: (state) => {
      state.Plan = [...state.Plan, state.WeeklyPlan];
    },
    SubmitPlan: (state, action) => {
      axios
        .post("workout/completed-workout-plan", {
          IDofCurrentUser: action.payload.IDofCurrentUser,
          PlanName: action.payload.PlanName,
          WorkoutPlan: state.Plan,
        })
        .then((res) => {
          toast.success("PLAN SUBMITTED SUCCESSFULLY!!");
        })
        .catch((error) => {
          toast.error("THERE WAS ERROR SUBMITTING PLAN!!");
        });
    },
  },
});

export const { AddPlan, AddWeeklyPlan, EmptyWeeklyPlan, SubmitPlan } =
  PlanSlice.actions;

export default PlanSlice.reducer;
