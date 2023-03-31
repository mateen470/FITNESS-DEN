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
  creatAccessToken: async (newUser) => {},
  creatRefreshToken: async (newUser) => {},
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
};

module.exports = utilityFunctions;
