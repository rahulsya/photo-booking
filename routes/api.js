const router = require("express").Router();
const multer = require("multer");
const { uploadSingel } = require("../middleware/multer");
const {
  ApiLoginController,
  ApiPhotoController,
  ApiKategoriController,
  ApiBookingController,
} = require("../controller");

router.get("/", (req, res) => {
  return res.json({
    status: "success",
    message: "this api",
  });
});
router.get("/me", (req, res) => {
  return res.json({
    status: "success",
    user: req.user,
  });
});
router.get("/photos", ApiPhotoController.Photos);
router.get("/categories", ApiKategoriController.categories);

router.post("/login", multer().none(), ApiLoginController.login);
router.post("/register", multer().none(), ApiLoginController.register);

// booking
router.get("/booking", multer().none(), ApiBookingController.allBooking);
router.post("/booking", uploadSingel, ApiBookingController.store);

module.exports = router;
