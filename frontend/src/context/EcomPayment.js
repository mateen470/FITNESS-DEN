import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllProductsInfoToBuy: {},
  CheckoutInfo: {},
};

export const EcomPaymentSlice = createSlice({
  name: "EcomPayment",
  initialState,
  reducers: {
    AddAllProductsInfoToBuy: (state, action) => {
      state.AllProductsInfoToBuy = action.payload;
    },
    AddCheckoutInfo: (state, action) => {
      state.CheckoutInfo = action.payload;
    },
  },
});

export const { AddAllProductsInfoToBuy, AddCheckoutInfo } =
  EcomPaymentSlice.actions;

export default EcomPaymentSlice.reducer;
