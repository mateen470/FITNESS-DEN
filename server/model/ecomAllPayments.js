const mongoose = require("mongoose");

const EcomAllPaymentsSchema = mongoose.Schema({
  IDofCurrentUser: String,
  AllProductsBoughtInfo: Array,
  CheckoutData: Object,
});

const EcomAllPaymentsModel = mongoose.model(
  "EcomAllPayments",
  EcomAllPaymentsSchema
);
module.exports = EcomAllPaymentsModel;
