const errorHandler = require("../helpers/errorHandler");
const successHandler = require("../helpers/successHandler");
const themeModel = require("../models/theme.model");
class Theme {
  static makeTheme = async (req, res) => {
    try {
      const theme = await themeModel.create(req.body);
      successHandler(theme, res, "theme chnaged successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static changeTheme = async (req, res) => {
    try {
      const theme = await themeModel.findByIdAndUpdate(
        "62aa57ae141a409a7951621b",
        req.body
      );
      successHandler(theme, res, "theme chnaged successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
  static getTheme = async (req, res) => {
    try {
      const theme = await themeModel.findById("62aa57ae141a409a7951621b");
      successHandler(theme, res, "theme chnaged successfully");
    } catch (err) {
      errorHandler(err, res);
    }
  };
}
module.exports = Theme;
