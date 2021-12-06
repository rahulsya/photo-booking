const adminContoller = require("./admin/photosController");
const userContoller = require("./admin/UsersContoller");
const categoriesContoller = require("./admin/CategoriesController");
const LoginController = require("./admin/LoginController");
const BookingController = require("./admin/BookingController");

//api
const ApiBookingController = require("./api/ApiBookingController");
const ApiLoginController = require("./api/ApiLoginController");
const ApiPhotoController = require("./api/ApiPhotoController");
const ApiKategoriController = require("./api/ApiKategoriController");

module.exports = {
  adminContoller,
  userContoller,
  categoriesContoller,
  LoginController,
  BookingController,

  //api
  ApiBookingController,
  ApiLoginController,
  ApiPhotoController,
  ApiKategoriController,
};
