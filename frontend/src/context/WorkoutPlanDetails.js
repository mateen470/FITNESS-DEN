import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  WorkoutPlanDetails: {},
}

export const WorkoutPlanDetailsSlice = createSlice({
  name: 'WorkoutPlanDetails',
  initialState,
  reducers: {
    AddWorkoutPlanDetails: (state,action) => {
      state.WorkoutPlanDetails=action.payload
    },

  },
})

export const { AddWorkoutPlanDetails} = WorkoutPlanDetailsSlice.actions

export default WorkoutPlanDetailsSlice.reducer