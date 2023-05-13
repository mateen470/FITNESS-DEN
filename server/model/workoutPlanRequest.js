const mongoose = require("mongoose");

const workoutPlanRequest = new mongoose.Schema({
  IDofCurrentUser: String,
  title: String,
  age: Number,
  weight: Number,
  height: Number,
  injury: Boolean,
  injuryDes: String,
  surgery: Boolean,
  surgeryDes: String,
  equipments: Boolean,
  equipmentsDes: String,
});

const workoutPlanRequestModel = new mongoose.model(
  "WorkoutPlanRequest",
  workoutPlanRequest
);
module.exports = workoutPlanRequestModel;
