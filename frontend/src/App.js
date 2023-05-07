import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/LogIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ActivationPage from "./pages/auth/ActivationPage";
import UserDashboardPage from "./pages/dashboard/user-dashboard/UserDashboardPage";
import AdminDashboard from "./pages/dashboard/admin-dashboard/AdminDashboard";
import TrainerDashboard from "./pages/dashboard/trainer-dashboard/TrainerDashboard";
import Map from "./pages/map/MapPage";
import NutritionFactsPage from "./pages/nutritionFacts/NutritionFactsPage";
import DietPlanPage from "./pages/dietPlan/DietPlanPage";
import DietPlanFormPage from "./pages/dietPlan/DietPlanFormPage";
import WorkoutPlanPage from "./pages/workoutPlan/WorkoutPlanPage";
import WorkoutPlanFormPage from "./pages/workoutPlan/WorkoutPlanFormPage";
import PaymentPage from "./pages/payment/PaymentPage";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/user" element={<UserDashboardPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/nutrition-facts" element={<NutritionFactsPage />} />
        <Route path="/diet-plans" element={<DietPlanPage />} />
        <Route path="/workout-plans" element={<WorkoutPlanPage />} />
        <Route path="/diet-plan-form" element={<DietPlanFormPage />} />
        <Route path="/workout-plan-form" element={<WorkoutPlanFormPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="/fitness-den/reset-password/:accessTokenForgotPassword"
          element={<ResetPassword />}
        />
        <Route
          path="/fitness-den/activation/:activationToken"
          element={<ActivationPage />}
        />
      </Routes>
    </>
  );
};

export default App;
