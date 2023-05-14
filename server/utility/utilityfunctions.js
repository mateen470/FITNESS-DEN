const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  verifyRefreshtoken: async (req, res, token) => {
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
        const userWithoutExp = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        const newAccessToken = createNewAccessToken(userWithoutExp);
        return await res.status(200).json({
          success: true,
          message: "ACCESS GRANTED!!",
          data: newAccessToken,
        });
      }
    );
  },
  passwordHashing: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);
    return newHashedPassword;
  },
  passwordVerification: async (providedPassword, verifiedPassword) => {
    return bcrypt.compare(providedPassword, verifiedPassword);
  },
  accessTokenVerification: async (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  },
};

const createNewAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "5m",
  });
};

module.exports = utilityFunctions;
