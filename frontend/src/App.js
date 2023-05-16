import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

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
import ViewDietPlan from "./pages/dietPlan/ViewDietPlanPage";
import ViewWorkoutPlan from "./pages/workoutPlan/ViewWorkoutPlanPage";
import AllDietPlanRequests from "./components/trainer-dashboard-section/AllDietPlanRequests";
import AllWorkoutPlanRequests from "./components/trainer-dashboard-section/AllWorkoutPlanRequests";
import CreateDietPlan from "./components/trainer-dashboard-section/CreateDietPlan";
import CreateWorkoutPlan from "./components/trainer-dashboard-section/CreateWorkoutPlan";
import DietPlanUpdateRequests from "./components/trainer-dashboard-section/DietPlanUpdateRequests";
import Exercise from "./components/trainer-dashboard-section/Exercise";
import UpdateDietPlan from "./components/trainer-dashboard-section/UpdateDietPlan";
import UpdateWorkoutPlan from "./components/trainer-dashboard-section/UpdateWorkoutPlan";
import ViewDietPlanDetails from "./components/trainer-dashboard-section/ViewDietPlanDetails";
import ViewWorkoutPlanDetails from "./components/trainer-dashboard-section/ViewWorkoutPlanDetails";
import WorkoutPlanUpdateRequests from "./components/trainer-dashboard-section/WorkoutPlanUpdateRequests";
import WorkoutPlanFormat from "./components/trainer-dashboard-section/WorkoutPlanFormat";
import NotFound from "./components/404-not-found/NotFound";
import AddBlog from "./components/blogs-section/AddBlog";
import ViewBlog from "./components/blogs-section/ViewBlog";
import UpdateBlog from "./components/blogs-section/UpdateBlog";
import ViewBlogHomePage from "./components/blogs-home-section/ViewSingleBlogPage";
import ShowAllBlogs from "./components/blogs-home-section/ShowAllBlogs";

const App = () => {
  const { isAdmin, isUser, isTrainer } = useSelector(
    (state) => state.CheckForUserType
  );
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
        <Route path="/view-diet-plan" element={<ViewDietPlan />} />
        <Route path="/view-workout-plan" element={<ViewWorkoutPlan />} />
        <Route path="/all-diet-plan-req" element={<AllDietPlanRequests />} />
        <Route path="/create-diet-plan" element={<CreateDietPlan />} />
        <Route path="/create-workout-plan" element={<CreateWorkoutPlan />} />
        <Route path="/update-diet-plan" element={<UpdateDietPlan />} />
        <Route path="/update-workout-plan" element={<UpdateWorkoutPlan />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/workout-plan-format" element={<WorkoutPlanFormat />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/view-blog/:id" element={<ViewBlog />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/view-blog-home/:id" element={<ViewBlogHomePage />} />
        <Route path="/show-all" element={<ShowAllBlogs />} />
        <Route
          path="/all-workout-plan-req"
          element={<AllWorkoutPlanRequests />}
        />
        <Route
          path="/diet-plan-update-req"
          element={<DietPlanUpdateRequests />}
        />
        <Route
          path="/workout-plan-update-req"
          element={<WorkoutPlanUpdateRequests />}
        />

        <Route
          path="/view-diet-plan-details"
          element={<ViewDietPlanDetails />}
        />
        <Route
          path="/view-workout-plan-details"
          element={<ViewWorkoutPlanDetails />}
        />
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
