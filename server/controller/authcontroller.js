import User from "../model/schema.js";
import utilityFunctions from "../utility/utilityfunctions";
import { sendEmail } from "../email/sendemail/js";

const AuthControllerFucntions = {
  SignUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE FILL IN ALL FIELDS!!" });
      }

      if (!utilityFunctions.emailSyntaxChecker(email)) {
        return await res.status(400).json({
          success: false,
          message: "INVALID EMAIL",
        });
      }

      const userAlreadyExist = await User.findOne({ email });

      if (userAlreadyExist) {
        return await res
          .status(400)
          .json({ success: false, message: "USER ALREADY EXIST!!" });
      } else if (password.length <= 8) {
        return await res.status(400).json({
          success: false,
          message: "PASSWORD SHOULD BE MORE THAN 8 CHARACTERS !!",
        });
      }

      const hashedPassword = await utilityFunctions.passwordHashing(password);

      newUserData = {
        name,
        email,
        password: hashedPassword,
      };

      const activationToken = await utilityFunctions.creatActivationToken(
        newUserData
      );
      const clientSideActivationPageLink = `${process.env.CLIENT_SIDE_URL}/fitness-den/activation/${activationToken}`;

      const message = `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the ✮FITNESS DEN✮</h2>
      <p>Congratulations! You're almost set to start using ✮FITNESS DEN✮
          Just click the button below to validate your email address.
      </p>
      
      <a href=${clientSideActivationPageLink} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">VERIFY EMAIL!</a>
  
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
  
      <div>${clientSideActivationPageLink}</div>
      </div>
  `;

      await sendEmail({
        to: newUserData.email,
        subject: "Email Verification ",
        text: message,
      });

      return await res.status(200).json({
        success: true,
        message: "SIGNUP PROCESS SUCCESFULL !!",
        user: newUserData,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `SIGNUP PROCESS FAILED!! ${error.message}`,
      });
    }
  },
  AccountActivation: async (req, res) => {
    try {
      const { activationToken } = await req.body;
      const verifiedNewUser = await utilityFunctions.verifyActivationToken(
        activationToken
      );
      const { name, email, password } = verifiedNewUser;

      const newUser = await new User({
        name,
        email,
        password,
      });

      await newUser.save();

      return await res.status(200).json({
        success: true,
        message: "ACCOUNT VERIFICATION DONE SUCCESSFULLY!!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `ACCOUNT VERIFICATION PROCESS FAILED!! ${error.message}`,
      });
    }
  },
  LogIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE FILL IN ALL FIELDS!!" });
      }

      if (!utilityFunctions.emailSyntaxChecker(email)) {
        return await res.status(400).json({
          success: false,
          message: "INVALID EMAIL",
        });
      }

      const verifiedUser = await User.findOne({ email });

      if (!verifiedUser) {
        return await res.status(400).json({
          success: false,
          message: "EMAIL DOES NOT EXIST PLEASE SIGNUP!!",
        });
      } else if (password.length <= 8) {
        return await res.status(400).json({
          success: false,
          message: "PASSWORD SHOULD BE MORE THAN 8 CHARACTERS !!",
        });
      }

      const verifiedPassword = await utilityFunctions.passwordVerification(
        password,
        verifiedUser.password
      );

      if (!verifiedPassword) {
        return await res.status(400).json({
          success: false,
          message: "INCORRECT PASSWORD!!",
        });
      }

      const accessToken = await utilityFunctions.creatAccessToken(verifiedUser);
      const refreshToken = await utilityFunctions.creatRefreshToken(
        verifiedUser
      );

      await res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        // path: "/fitness-den/refreshToken",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return await res.staus(200).json({
        success: true,
        message: "SIGNIN PROCESS SUCCESSFULL!!",
        data: accessToken,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `SIGNIN PROCESS FAILED!! ${error.message}`,
      });
    }
  },
  RefreshAccessToken: async (req, res) => {
    try {
      const accessTicket = await req.cookies.refreshToken;

      if (!accessTicket) {
        return await res.status(400).json({
          success: false,
          message: `UNAUTHORIZED!! ${error.message}`,
        });
      }

      refreshTokenVerification = await utilityFunctions.verifyRefreshtoken(
        accessTicket
      );
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `UNAUTHORIZED!! ${error.message}`,
      });
    }
  },
  LogOut: async (req, res) => {
    try {
      const accessCookie = await req.cookies.refreshToken;
      if (!accessCookie) {
        return await res.status(400).json({
          success: false,
          message: "CAN'T LOGOUT!!",
        });
      }
      await res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return await res.status(200).json({
        success: true,
        message: "LOGOUT SUCCESSFULL!!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FAILED TO LOGOUT!! ${error.message}`,
      });
    }
  },
  ForgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!utilityFunctions.emailSyntaxChecker(email)) {
        return await res.status(400).json({
          success: false,
          message: "INVALID EMAIL",
        });
      }

      const verifiedEmail = await User.findOne({ email });
      if (!verifiedEmail) {
        return await res.status(400).json({
          success: false,
          message: "EMAIL DOES NOT EXIST!!",
        });
      }

      const accessTokenForgotPassword = await utilityFunctions.creatAccessToken(
        { id: verifiedEmail.id }
      );

      const clientSideResetPasswordPageLink = `${process.env.CLIENT_SIDE_URL}/fitness-den/reset-password/${accessTokenForgotPassword}`;

      const message = ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the ✮FITNESS DEN✮</h2>
      <p>
          Just click the button below to reset your password.
      </p>
      
      <a href=${clientSideResetPasswordPageLink} style="background: blue; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">RESET PASSWORD!</a>
  
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
  
      <div>${clientSideResetPasswordPageLink}</div>
      </div>`;

      sendEmail({
        to: verifiedEmail.email,
        subject: "PASSWORD RESET REQUEST",
        text: message,
      });

      return await res.status(200).json({
        success: true,
        message: "RESET PASSWORD LINK SENT TO THE PROVIDED EMAIL!!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `FORGOT PASSWORD PROCESS FAILED!! ${error.message}`,
      });
    }
  },
  ResetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const updatedHashedPassword = await utilityFunctions.passwordHashing(
        password
      );

      await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          password: updatedHashedPassword,
        }
      );
      return await res.status(200).json({
        success: true,
        message: "PASSWORD HAS BEEN SUCCESSFULLY UPDATED!!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `RESET PASSWORD PROCESS FAILED!! ${error.message}`,
      });
    }
  },
};

module.exports = AuthControllerFucntions;
