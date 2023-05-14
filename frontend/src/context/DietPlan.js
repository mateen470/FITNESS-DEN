import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  DietPlan: [],
  WeeklyDietPlan: [],
};

export const DietPlanSlice = createSlice({
  name: "DietPlan",
  initialState,
  reducers: {
    AddWeeklyDietPlan: (state, action) => {
      state.WeeklyDietPlan = [...state.WeeklyDietPlan, action.payload];
    },
    EmptyWeeklyDietPlan: (state) => {
      state.WeeklyDietPlan = [];
    },
    AddDietPlan: (state) => {
      state.DietPlan = [...state.DietPlan, state.WeeklyDietPlan];
    },
    SubmitDietPlan: (state, action) => {
      axios
        .post("diet/completed-diet-plan", {
          IDofCurrentUser: action.payload.IDofCurrentUser,
          PlanName: action.payload.PlanName,
          DietPlan: state.DietPlan,
        })
        .then((res) => {
          console.log(res.data.data);
          toast.success("PLAN SUBMITTED SUCCESSFULLY!!");
        })
        .catch((error) => {
          toast.error("THERE WAS ERROR SUBMITTING PLAN!!");
        });
    },
  },
});

export const {
  AddDietPlan,
  AddWeeklyDietPlan,
  EmptyWeeklyDietPlan,
  SubmitDietPlan,
} = DietPlanSlice.actions;

export default DietPlanSlice.reducer;
