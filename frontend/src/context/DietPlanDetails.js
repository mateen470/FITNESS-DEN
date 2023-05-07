import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  DietPlanDetails: {},
}

export const DietPlanDetailsSlice = createSlice({
  name: 'DietPlanDetails',
  initialState,
  reducers: {
    AddDietPlanDetails: (state,action) => {
      state.DietPlanDetails=action.payload
    },

  },
})

export const { AddDietPlanDetails} = DietPlanDetailsSlice.actions

export default DietPlanDetailsSlice.reducer