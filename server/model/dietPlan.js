const mongoose = require("mongoose");

const dietPlan = new mongoose.Schema({
  DietPlan: Array,
  IDofCurrentUser: String,
});

const dietPlanModel = new mongoose.model("DietPlan", dietPlan);
module.exports = dietPlanModel;
