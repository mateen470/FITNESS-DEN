const mongoose = require("mongoose");

const AllPaymentsSchema = mongoose.Schema({
  PlanType: String,
  PlanAmount: Number,
});

const AllPaymentsModel = mongoose.model("AllPayments", AllPaymentsSchema);
module.exports = AllPaymentsModel;
