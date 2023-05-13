const mongoose = require("mongoose");

const dietPlanRequest = new mongoose.Schema({
  IDofCurrentUser: String,
  Title: String,
  Age: Number,
  Weight: Number,
  MedicalHistory: Boolean,
  MedicalHistoryDes: String,
});

const dietPlanRequestModel = new mongoose.model(
  "DietPlanRequest",
  dietPlanRequest
);
module.exports = dietPlanRequestModel;
