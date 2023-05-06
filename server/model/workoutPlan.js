const mongoose = require("mongoose");

const workoutPlan = new mongoose.Schema({
  WorkoutPlan: Array,
});

const workoutPlanModel = new mongoose.model("WorkoutPlan", workoutPlan);
module.exports = workoutPlanModel;
