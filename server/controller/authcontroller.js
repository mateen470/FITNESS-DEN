import User from "../model/schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import JwtCreatingFucntions from "../utility/utilityfunctions";

const AuthControllerFucntions = {
  SignUp: async (req, res) => {},
  AccountActivation: async (req, res) => {},
  LogIn: async (req, res) => {},
  RefreshAccessToken: async (req, res) => {},
  ForgotPassword: async (req, res) => {},
  ResetPassword: async (req, res) => {},
};

module.exports = AuthControllerFucntions;
