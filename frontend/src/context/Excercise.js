import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  Excercise: [],
  SingleExcercise:[],

}

export const ExcerciseSlice = createSlice({
  name: 'Excercise',
  initialState,
  reducers: {
    AddExcercise: (state,action) => {
      state.Excercise=[...state.Excercise,action.payload]
    },
    EmptyExcercise:(state)=>{
        state.Excercise=[]
    },
    FetchExcercise: (state,action) => {
      state.SingleExcercise=action.payload
    },
  },
})

export const { AddExcercise, EmptyExcercise, FetchExcercise } = ExcerciseSlice.actions

export default ExcerciseSlice.reducer