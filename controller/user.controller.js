const userModel = require("../models/user.model");
const errorHandler = require("../helpers/errorHandler");
const errorAuthHandler = require("../helpers/errorAuthHandler");
const successHandler = require("../helpers/successHandler");
const bcrypt = require("bcryptjs");
class User {
  static register = async (req, res) => {
    try {
      const user = await new userModel(req.body);
      await user.generateToken();
      await user.save();
      successHandler(user, res, "User registered successfully");
    } catch (err) {
      errorAuthHandler(err, res);
    }
  };
  static registerAdmin = async (req, res) => {
    try {
      if (req.body.role === "User") throw new Error("UnAuthorized User");
      const admin = await new userModel(req.body);
      await admin.generateToken();
      await admin.save();
      successHandler(admin, res, "Admin registered successfully");
    } catch (err) {
      errorAuthHandler(err, res);
    }
  };
  static login = async (req, res) => {
    try {
      const user = await userModel.loginUser(req.body.email, req.body.password);
      await user.generateToken();
      await user.save();
      successHandler(user, res, "User logged in successfully");
    } catch (err) {
      console.log(err);
      errorAuthHandler(err, res);
    }
  };
  static profileShow = async (req, res) => {
    successHandler(req.user, res, "User shown successfully");
  };
  static passwordEdit = async (req, res) => {
    try {
      const validPassword = await bcrypt.compare(
        req.body.password,
        req.user.password
      );

      if (validPassword) {
        req.user.password = req.body.new_password;
        await req.user.save();
        successHandler(req.user, res, " password is edited successfully");
      } else throw new Error("Incorrect Password");
    } catch (err) {
      errorAuthHandler(err, res);
    }
  };

  static logout = async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.user._id, { token: "" });
      successHandler(null, res, "User logged out successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
}
module.exports = User;
