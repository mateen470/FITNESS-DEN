const express = require("express");
const dietRouter = express.Router();
const DietPlanControllerFunctions = require("../controller/dietplancontroller");
dietRouter.post("/dietform", DietPlanControllerFunctions.DietPlanFilledForm);
dietRouter.delete(
  "/diet-request/:id",
  DietPlanControllerFunctions.DeletePlanRequestAfterCompletion
);
dietRouter.post(
  "/completed-diet-plan",
  DietPlanControllerFunctions.SendCompletedPlanToUser
);
dietRouter.post(
  "/update-diet-plan/:id",
  DietPlanControllerFunctions.UpdatePlan
);
dietRouter.get(
  "/all-diet-plans/:id",
  DietPlanControllerFunctions.GetAllCompletedPlans
);
dietRouter.get(
  "/all-new-diet-requests",
  DietPlanControllerFunctions.GetAllNewPlansRequests
);
dietRouter.post(
  "/diet-update-request",
  DietPlanControllerFunctions.SendUpdateRequest
);
dietRouter.get(
  "/all-diet-update-request",
  DietPlanControllerFunctions.GetAllUpdatePlansRequests
);
dietRouter.get(
  "/diet-update-request/:id",
  DietPlanControllerFunctions.OpenSpecificUpdatePlanRequest
);
dietRouter.delete(
  "/diet-update-request/:id",
  DietPlanControllerFunctions.DeleteUpdateRequestAfterCompletion
);
module.exports = dietRouter;
