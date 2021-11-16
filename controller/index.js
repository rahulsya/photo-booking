const adminContoller = require("./admin/photosController");
const userContoller = require("./admin/UsersContoller");
const categoriesContoller = require("./admin/CategoriesController");
const LoginController = require("./admin/LoginController");

module.exports = {
  adminContoller,
  userContoller,
  categoriesContoller,
  LoginController,
};
