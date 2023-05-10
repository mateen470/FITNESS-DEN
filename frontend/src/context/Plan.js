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
      state.Plan = [...state.Plan, [state.WeeklyPlan]];
    },
    SubmitPlan: (state) => {
      console.log("frontend1")
      axios
        .post("workout/completed-workout-plan", state.Plan)
        .then((res) => {
          console.log("frontend2")
          console.log(res.data.data);
          console.log("frontend3")
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
