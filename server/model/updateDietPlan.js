const mongoose = require("mongoose");

const updateDietPlan = new mongoose.Schema({
  Description: String,
  PlanID: String,
});

const updateDietPlanModel = new mongoose.model("UpdateDietPlan", updateDietPlan);
module.exports = updateDietPlanModel;
