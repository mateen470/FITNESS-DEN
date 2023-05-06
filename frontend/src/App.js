import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/LogIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ActivationPage from "./pages/auth/ActivationPage";
import UserDashboardPage from "./pages/dashboard/user-dashboard/UserDashboardPage";
import AdminDashboard from "./pages/dashboard/admin-dashboard/AdminDashboard";
import Map from "./pages/map/MapPage";
import NutritionFactsPage from "./pages/nutritionFacts/NutritionFactsPage"
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/user" element={<UserDashboardPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/fitness-den/reset-password/:accessTokenForgotPassword"
          element={<ResetPassword />}
        />
        <Route
          path="/fitness-den/activation/:activationToken"
          element={<ActivationPage />}
        />
        <Route path="/map" element={<Map />} />
        <Route path="/nutrition-facts" element={<NutritionFactsPage />} />
      </Routes>
    </>
  );
};

export default App;
