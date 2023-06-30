import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import AddProduct from "./components/e-com/e-com-admin/AddProduct";
import ViewProduct from "./components/e-com/e-com-admin/ViewProduct";
import UpdateProduct from "./components/e-com/e-com-admin/UpdateProduct";
import ViewBlogHomePage from "./components/blogs-home-section/ViewSingleBlogPage";
import ViewProductHomePage from "./components/e-com/e-com-home/ViewSingleProduct";
import ShowAllBlogs from "./components/blogs-home-section/ShowAllBlogs";
import ShowAllProducts from "./components/e-com/e-com-home/ShowAllProducts";
import ProtectedRoute from "./routes/ProtectedRoute";
import Cart from "./components/e-com/e-com-home/AddToCart";
import Checkout from "./components/e-com/e-com-payment/Checkout";
import EcomPaymentPage from "./pages/payment/EcomPaymentPage";
import PaidOrder from "./components/user-dashboard-section/PaidOrders";
import PaidProduct from "./components/admin-dashboard-section/PaidProductView";
import LogOut from "./components/LogOut/LogOut";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const { isAdmin, isUser, isTrainer } = useSelector(
    (state) => state.CheckForUserType
  );
  const checkRole = (allowedRoles) =>
    (allowedRoles.includes("admin") && isAdmin) ||
    (allowedRoles.includes("user") && isUser) ||
    (allowedRoles.includes("trainer") && isTrainer);

  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/map" element={<Map />} />
        <Route path="/nutrition-facts" element={<NutritionFactsPage />} />
        <Route path="/diet-plans" element={<DietPlanPage />} />
        <Route path="/workout-plans" element={<WorkoutPlanPage />} />
        <Route path="/view-blog-home/:id" element={<ViewBlogHomePage />} />
        <Route
          path="/view-product-home/:id"
          element={<ViewProductHomePage />}
        />
        <Route path="/show-all" element={<ShowAllBlogs />} />
        <Route path="/show-all-products" element={<ShowAllProducts />} />
        <Route path="/unauthorized" element={<NotFound />} />
        <Route path="/route-check" element={<ProtectedRoute />} />
        <Route
          path="/fitness-den/reset-password/:accessTokenForgotPassword"
          element={<ResetPassword />}
        />
        <Route
          path="/fitness-den/activation/:activationToken"
          element={<ActivationPage />}
        />
        <Route
          path="/add-blog"
          element={
            checkRole(["admin"]) ? <AddBlog /> : <Navigate to="/unauthorized" />
          }
        />

        <Route
          path="/view-blog/:id"
          element={
            checkRole(["admin"]) ? (
              <ViewBlog />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />

        <Route
          path="/update-blog/:id"
          element={
            checkRole(["admin"]) ? (
              <UpdateBlog />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/add-product"
          element={
            checkRole(["admin"]) ? (
              <AddProduct />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/view-product/:id"
          element={
            checkRole(["admin"]) ? (
              <ViewProduct />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/update-product/:id"
          element={
            checkRole(["admin"]) ? (
              <UpdateProduct />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/paid-product-view/:id"
          element={
            checkRole(["admin"]) ? (
              <PaidProduct />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            checkRole(["admin"]) ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/user"
          element={
            checkRole(["user"]) ? (
              <UserDashboardPage />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            checkRole(["user"]) ? <Cart /> : <Navigate to="/unauthorized" />
          }
        />
        <Route
          path="/payment"
          element={
            checkRole(["user"]) ? (
              <PaymentPage />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/view-diet-plan"
          element={
            checkRole(["user"]) ? (
              <ViewDietPlan />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/view-workout-plan"
          element={
            checkRole(["user"]) ? (
              <ViewWorkoutPlan />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/diet-plan-form"
          element={
            checkRole(["user"]) ? (
              <DietPlanFormPage />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/workout-plan-form"
          element={
            checkRole(["user"]) ? (
              <WorkoutPlanFormPage />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/exercise"
          element={
            checkRole(["user"]) ? <Exercise /> : <Navigate to="/unauthorized" />
          }
        />
        <Route
          path="/checkout"
          element={
            checkRole(["user"]) ? <Checkout /> : <Navigate to="/unauthorized" />
          }
        />
        <Route
          path="/ecom-payment"
          element={
            checkRole(["user"]) ? (
              <EcomPaymentPage />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/paid-orders"
          element={
            checkRole(["user"]) ? (
              <PaidOrder />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/trainer"
          element={
            checkRole(["trainer"]) ? (
              <TrainerDashboard />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/all-diet-plan-req"
          element={
            checkRole(["trainer"]) ? (
              <AllDietPlanRequests />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/create-diet-plan"
          element={
            checkRole(["trainer"]) ? (
              <CreateDietPlan />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/create-workout-plan"
          element={
            checkRole(["trainer"]) ? (
              <CreateWorkoutPlan />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/update-diet-plan"
          element={
            checkRole(["trainer"]) ? (
              <UpdateDietPlan />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/update-workout-plan"
          element={
            checkRole(["trainer"]) ? (
              <UpdateWorkoutPlan />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/workout-plan-format"
          element={
            checkRole(["trainer"]) ? (
              <WorkoutPlanFormat />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/all-workout-plan-req"
          element={
            checkRole(["trainer"]) ? (
              <AllWorkoutPlanRequests />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/diet-plan-update-req"
          element={
            checkRole(["trainer"]) ? (
              <DietPlanUpdateRequests />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/workout-plan-update-req"
          element={
            checkRole(["trainer"]) ? (
              <WorkoutPlanUpdateRequests />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/view-diet-plan-details"
          element={
            checkRole(["trainer"]) ? (
              <ViewDietPlanDetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route
          path="/view-workout-plan-details"
          element={
            checkRole(["trainer"]) ? (
              <ViewWorkoutPlanDetails />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
