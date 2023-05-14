const mongoose = require("mongoose");

const dietPlan = new mongoose.Schema({
  PlanName: String,
  DietPlan: Array,
  IDofCurrentUser: String,
});

const dietPlanModel = new mongoose.model("DietPlan", dietPlan);
module.exports = dietPlanModel;
