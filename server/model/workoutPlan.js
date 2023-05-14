const mongoose = require("mongoose");

const workoutPlan = new mongoose.Schema({
  PlanName: String,
  WorkoutPlan: Array,
  IDofCurrentUser: String,
});

const workoutPlanModel = new mongoose.model("WorkoutPlan", workoutPlan);
module.exports = workoutPlanModel;
