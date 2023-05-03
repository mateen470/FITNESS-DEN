const express = require("express");
const router = express.Router();
const AuthControllerFunctions = require("../controller/authcontroller");
const middleWare = require("../middleware/middleware");

router.post("/signup", AuthControllerFunctions.SignUp);
router.post("/activation", AuthControllerFunctions.AccountActivation);
router.post("/login", AuthControllerFunctions.LogIn);
router.post("/refreshtoken", AuthControllerFunctions.RefreshAccessToken);
router.get("/auth-user", AuthControllerFunctions.AuthenticatedUser);
router.post("/logout", AuthControllerFunctions.LogOut);
router.post("/forgotpassword", AuthControllerFunctions.ForgotPassword);
router.post(
  "/resetpassword",
  middleWare.tokenVerificationOfResetPasswordPage,
  AuthControllerFunctions.ResetPassword
);

module.exports = router;
