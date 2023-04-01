const jwt = require("jsonwebtoken");

const middleWare = {
  tokenVerificationOfResetPasswordPage: async (req, res, next) => {
    try {
      const token = await req.headers.authorization;

      if (!token) {
        return await res.status(400).json({
          success: false,
          message: "INVALID USER!!",
        });
      }

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        async (error, user) => {
          if (error) {
            return await res.status(400).json({
              success: false,
              message: "INVALID TOKEN!!",
            });
          }
          req.user = user;
          next();
        }
      );
    } catch (error) {
      return await res.status(500).json({
        success: false,
        message: `PROCESS FAILED IN VERIFYING RESET PASSWORD PAGE TOKEN!!${error}`,
      });
    }
  },
};

module.exports = middleWare;
