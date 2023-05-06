const mongoose = require("mongoose");

const updateWorkoutPlan = new mongoose.Schema({
  Description: String,
  Plan: Object,
});

const updateWorkoutPlanModel = new mongoose.model(
  "UpdateWorkoutPlan",
  updateWorkoutPlan
);
module.exports = updateWorkoutPlanModel;
