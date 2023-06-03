const mongoose = require("mongoose");

const EcomAllPaymentsSchema = mongoose.Schema({
  IDofCurrentUser: String,
  AllProductsBoughtInfo: Array,
  CheckoutData: Object,
  status: {
    type: String,
    default: "in Process",
  },
});

const EcomAllPaymentsModel = mongoose.model(
  "EcomAllPayments",
  EcomAllPaymentsSchema
);
module.exports = EcomAllPaymentsModel;
