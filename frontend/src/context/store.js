import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import PlanReducer from "./Plan";
import ExcerciseReducer from "./Excercise";
import UpdatePlanReducer from "./UpdatePlan";
import DietPlanReducer from "./DietPlan";
import WorkoutPlanDetailsReducer from "./WorkoutPlanDetails";
import DietPlanDetailsReducer from "./DietPlanDetails";
import SelectedPlanReducer from "./SelectedPlan";
import PhysicalInfoReducer from "./PhysicalInfo";
import CurrentUserReducer from "./CurrentUser";
import CheckForNewPlanRequestsReducer from "./CheckForNewPlanRequests";
import CheckForUserTypeReducer from "./CheckForUserType";
import EcomPaymentReducer from "./EcomPayment";
const persistConfig = {
  key: "root",
  blacklist: ["Plan", "Excercise", "DietPlan"],
  storage,
};

const reducer = combineReducers({
  Plan: PlanReducer,
  Excercise: ExcerciseReducer,
  UpdatePlan: UpdatePlanReducer,
  DietPlan: DietPlanReducer,
  WorkoutPlanDetails: WorkoutPlanDetailsReducer,
  DietPlanDetails: DietPlanDetailsReducer,
  SelectedPlan: SelectedPlanReducer,
  PhysicalInfo: PhysicalInfoReducer,
  CurrentUser: CurrentUserReducer,
  CheckForNewPlanRequests: CheckForNewPlanRequestsReducer,
  CheckForUserType: CheckForUserTypeReducer,
  EcomPayment: EcomPaymentReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
});
