import express from "express";
const router = express.Router();
import AuthControllerFunctions from "../controller/authcontroller.js";
import middleWare from "../middleware/middleware.js";

router.post("/signup", AuthControllerFunctions.SignUp);
router.post("/activation", AuthControllerFunctions.AccountActivation);
router.post("/login", AuthControllerFunctions.LogIn);
router.post("/refreshtoken", AuthControllerFunctions.RefreshAccessToken);
router.post("/logout", AuthControllerFunctions.LogOut);
router.post("/forgotpassword", AuthControllerFunctions.ForgotPassword);
router.post(
  "/resetpassword",
  middleWare.tokenVerificationOfResetPasswordPage,
  AuthControllerFunctions.ResetPassword
);

module.exports = router;
