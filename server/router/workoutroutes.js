const express = require("express");
const workoutRouter = express.Router();
const WorkoutPlanControllerFunctions = require("../controller/workoutplancontroller");

workoutRouter.post(
  "/workoutform",
  WorkoutPlanControllerFunctions.WorkoutPlanFilledForm
);
workoutRouter.delete(
  "/workout-request/:id",
  WorkoutPlanControllerFunctions.DeletePlanRequestAfterCompletion
);
workoutRouter.post(
  "/completed-workout-plan",
  WorkoutPlanControllerFunctions.SendCompletedPlanToUser
);
workoutRouter.post(
  "/update-workout-plan/:id",
  WorkoutPlanControllerFunctions.UpdatePlan
);
workoutRouter.get(
  "/all-workout-plans/:id",
  WorkoutPlanControllerFunctions.GetAllCompletedPlans
);
workoutRouter.get(
  "/all-new-workout-requests",
  WorkoutPlanControllerFunctions.GetAllNewPlansRequests
);
workoutRouter.post(
  "/workout-update-request",
  WorkoutPlanControllerFunctions.SendUpdateRequest
);
workoutRouter.get(
  "/all-workout-update-request",
  WorkoutPlanControllerFunctions.GetAllUpdatePlansRequests
);
workoutRouter.get(
  "/workout-update-request/:id",
  WorkoutPlanControllerFunctions.OpenSpecificUpdatePlanRequest
);
workoutRouter.delete(
  "/workout-update-request/:id",
  WorkoutPlanControllerFunctions.DeleteUpdateRequestAfterCompletion
);
module.exports = workoutRouter;
