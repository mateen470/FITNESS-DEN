import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const utilityFunctions = {
  creatActivationToken: async (newUser) => {
    return jwt.sign(newUser, process.env.ACTIVATION_TOKEN_SECRET_KEY, {
      expiresIn: "10m",
    });
  },
  verifyActivationToken: async (token) => {
    return jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET_KEY);
  },
  creatAccessToken: async (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "5m",
    });
  },
  creatRefreshToken: async (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "7d",
    });
  },
  verifyRefreshtoken: async (token) => {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (error, user) => {
        if (error) {
          return await res.status(403).json({
            success: false,
            message: "FORBIDDEN!!",
          });
        }
        const newAccessToken = createNewAccessToken(user);
        return await res.status(200).json({
          success: true,
          message: "ACCESS GRANTED!!",
          data: newAccessToken,
        });
      }
    );
  },
  emailSyntaxChecker: async (email) => {
    const emailChecker =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailChecker.test(email);
  },
  passwordHashing: async (password) => {
    const salt = bcrypt.genSalt(10);
    const newHashedPassword = bcrypt.hash(password, salt);
    return newHashedPassword;
  },
  passwordVerification: async (providedPassword, verifiedPassword) => {
    return bcrypt.compare(providedPassword, verifiedPassword);
  },
};

const createNewAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "5m",
  });
};

module.exports = utilityFunctions;
