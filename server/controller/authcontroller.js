const User = require("../model/auth-schema");
const utilityFunctions = require("../utility/utilityfunctions");
const sendEmail = require("../email/sendemail");

const AuthControllerFunctions = {
  SignUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return await res
          .status(400)
          .json({ success: false, message: "PLEASE FILL IN ALL FIELDS!!" });
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
      } else {
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

        sendEmail({
          to: newUserData.email,
          subject: "Email Verification ",
          text: message,
        });

        return await res.status(200).json({
          success: true,
          message: "EMAIL SENT TO YOUR EMAIL ADDRESS!!",
          user: newUserData,
        });
      }
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `SIGNUP PROCESS FAILED!!`,
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
        message: `ACCOUNT VERIFICATION PROCESS FAILED!!`,
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

      const accessToken = await utilityFunctions.creatAccessToken({
        id: verifiedUser.id,
      });
      const refreshToken = await utilityFunctions.creatRefreshToken({
        id: verifiedUser.id,
        name: verifiedUser.name,
        role: verifiedUser.role,
      });

      await res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return await res.status(200).json({
        success: true,
        message: "WELCOME BACK!!",
        data: accessToken,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `SIGNIN PROCESS FAILED!! ${error.message}`,
      });
    }
  },
  AuthenticatedUser: async (req, res) => {
    try {
      const accessToken = req.header("Authorization")?.split(" ")[1] || "";
      if (!accessToken) {
        return await res.status(400).json({
          success: false,
          message: "UNAUTHORIZED!! NO TOKEN FOUND",
        });
      }
      accessTokenVerified = await utilityFunctions.accessTokenVerification(
        accessToken
      );
      const authenticatedUser = await User.findOne({
        _id: accessTokenVerified.id,
      });
      if (!authenticatedUser) {
        return await res.status(401).json({
          success: false,
          message: "UNAUTHORIZED!! USER IS NOT VALID",
        });
      }

      const { password, ...data } = authenticatedUser;

      return await res.status(200).json({
        success: true,
        message: "USER AUTHORIZED!!",
        data: data,
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `UNAUTHORIZED!!`,
      });
    }
  },
  RefreshAccessToken: async (req, res) => {
    try {
      accessTicket = await req.cookies["refreshToken"];
      if (!accessTicket) {
        return await res.status(400).json({
          success: false,
          message: "UNAUTHORIZED!!",
        });
      }
      refreshTokenVerification = await utilityFunctions.verifyRefreshtoken(
        req,
        res,
        accessTicket
      );
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `UNAUTHORIZED!!`,
      });
    }
  },
  LogOut: async (req, res) => {
    try {
      await res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return await res.status(200).json({
        success: true,
        message: "LOGOUT SUCCESSFULL!!",
      });
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: "FAILED TO LOGOUT!!",
      });
    }
  },
  ForgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

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
        message: `FORGOT PASSWORD PROCESS FAILED!!`,
      });
    }
  },
  ResetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      if (password.length <= 8) {
        return await res.status(400).json({
          success: false,
          message: "PASSWORD SHOULD BE MORE THAN 8 CHARACTERS !!",
        });
      }
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
        message: `RESET PASSWORD PROCESS FAILED!!`,
      });
    }
  },
  AddToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "PLEASE PROVIDE ALL FIELDS!!",
        });
      }
      const user = await User.findById(userId);
      const cartItemIndex = user.cart.findIndex(
        (item) => item.productId === productId
      );

      if (cartItemIndex !== -1) {
        user.cart[cartItemIndex].quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }
      await user.save();

      return res.status(200).json({
        success: true,
        message: "PRODUCT ADDED SUCCESSFULLY!!",
        data: user.cart,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `FAILED TO ADD PRODUCT IN CART ${error.message}`,
      });
    }
  },
  RemoveFromCart: async (req, res) => {
    try {
      const productId = req.params;
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "PRODUCT ID IS NOT PROVIDED!!",
        });
      }
      const accessToken = req.header("Authorization")?.split(" ")[1] || "";
      if (!accessToken) {
        return await res.status(400).json({
          success: false,
          message: "UNAUTHORIZED!! NO TOKEN FOUND",
        });
      }
      accessTokenVerified = await utilityFunctions.accessTokenVerification(
        accessToken
      );
      const user = await User.findOne({
        _id: accessTokenVerified.id,
      });

      const cartItemIndex = user.cart.findIndex(
        (item) => item.productId === productId.id
      );
      if (cartItemIndex !== -1) {
        user.cart.splice(cartItemIndex, 1);
        await user.save();

        return res.status(200).json({
          success: true,
          message: "PRODUCT REMOVED!!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "PRODUCT CANNOT BE REMOVED!!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "ISSUE OCCURED IN REMOVING CART ITEM!!",
      });
    }
  },
  GetCartItems: async (req, res) => {
    try {
      const accessToken = req.header("Authorization")?.split(" ")[1] || "";
      if (!accessToken) {
        return await res.status(400).json({
          success: false,
          message: "UNAUTHORIZED!! NO TOKEN FOUND",
        });
      }
      accessTokenVerified = await utilityFunctions.accessTokenVerification(
        accessToken
      );
      const authenticatedUser = await User.findOne({
        _id: accessTokenVerified.id,
      });
      return res.status(200).json({
        success: true,
        message: "CART ITEMS FETCHED!!",
        data: authenticatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `FAILED TO FETCH CART ITEMS!!${error.message}`,
      });
    }
  },
  IncrementProduct: async (req, res) => {
    try {
      const productId = req.params;
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "PRODUCT ID IS NOT PROVIDED!!",
        });
      }
      const accessToken = req.header("Authorization")?.split(" ")[1] || "";
      if (!accessToken) {
        return await res.status(400).json({
          success: false,
          message: "UNAUTHORIZED!! NO TOKEN FOUND",
        });
      }
      accessTokenVerified = await utilityFunctions.accessTokenVerification(
        accessToken
      );
      const user = await User.findOne({
        _id: accessTokenVerified.id,
      });

      const cartItemIndex = user.cart.findIndex(
        (item) => item.productId === productId.id
      );

      if (cartItemIndex !== -1) {
        user.cart[cartItemIndex].quantity += 1;
      }
      await user.save();

      return res.status(200).json({
        success: true,
        message: "INCREMENTED!!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `FAILED TO INCREMENT!!${error.message}`,
      });
    }
  },
  DecrementProduct: async (req, res) => {
    try {
      const productId = req.params;
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "PRODUCT ID IS NOT PROVIDED!!",
        });
      }
      const accessToken = req.header("Authorization")?.split(" ")[1] || "";
      if (!accessToken) {
        return await res.status(400).json({
          success: false,
          message: "UNAUTHORIZED!! NO TOKEN FOUND",
        });
      }
      accessTokenVerified = await utilityFunctions.accessTokenVerification(
        accessToken
      );
      const user = await User.findOne({
        _id: accessTokenVerified.id,
      });

      const cartItemIndex = user.cart.findIndex(
        (item) => item.productId === productId.id
      );

      if (cartItemIndex !== -1) {
        user.cart[cartItemIndex].quantity -= 1;
      }
      await user.save();

      return res.status(200).json({
        success: true,
        message: "DECREMENTED!!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `FAILED TO DECREMENT!!${error.message}`,
      });
    }
  },
  RemoveAllProductsFromCartAfterPayment: async (req, res) => {
    try {
      const accessToken = req.header("Authorization")?.split(" ")[1] || "";
      if (!accessToken) {
        return await res.status(400).json({
          success: false,
          message: "UNAUTHORIZED!! NO TOKEN FOUND",
        });
      }
      accessTokenVerified = await utilityFunctions.accessTokenVerification(
        accessToken
      );
      const user = await User.findOne({
        _id: accessTokenVerified.id,
      });

      user.cart = [];

      await user.save();

      return res.status(200).json({
        success: true,
        message: "CART IS NOW EMPTY!!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `FAILED TO REMOVE PRODUCTS FROM CART AFTER PAYMENT!!${error.message}`,
      });
    }
  },
  AllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();

      return await res.status(200).json({
        success: true,
        message: "ALL USERS ARE FETCHED!!",
        data: allUsers,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `FAILED TO GET ALL USERS!!${error.message}`,
      });
    }
  },
};

module.exports = AuthControllerFunctions;
