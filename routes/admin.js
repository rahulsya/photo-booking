const router = require("express").Router();
const {
  adminContoller,
  userContoller,
  categoriesContoller,
  LoginController,
  BookingController,
} = require("../controller");
const multer = require("multer");
const { uploadSingel } = require("../middleware/multer");
const auth = require("../middleware/auth");
router.get("/signin", (req, res) => {
  if (!req.session.user) {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    return res.render("index", { title: "Login", alert });
  }
  return res.redirect("/admin");
});
router.post("/signin", multer().none(), LoginController.actionLogin);

router.use(auth);
router.get("/logout", LoginController.actionLogout);
router.get("/", adminContoller.viewDashboard);
// photos
router.get("/photos", adminContoller.viewPhoto);
router.put("/photo", uploadSingel, adminContoller.editPhoto);
router.post("/photo", uploadSingel, adminContoller.addPhoto);
router.delete("/photo/:id", adminContoller.deletePhoto);

// categories
router.get("/categories", categoriesContoller.viewCategories);
router.post("/categories", uploadSingel, categoriesContoller.addCategories);
router.put("/categories", uploadSingel, categoriesContoller.editCategories);
router.delete("/categories/:id", categoriesContoller.deleteCategories);

//booking
router.get("/booking", BookingController.viewBooking);
router.post("/booking", multer().none(), BookingController.filterBooking);
router.get("/booking/:id", BookingController.detailBooking);
router.put("/booking/:id/confirmation", BookingController.confirmationBooking);
router.put("/booking/:id/reject", BookingController.rejectBooking);
router.delete("/booking/:id", BookingController.deleteBooking);

// users
router.get("/users", userContoller.viewUsers);
router.post("/users", multer().none(), userContoller.addUser);
router.put("/users", multer().none(), userContoller.updateUser);
router.delete("/users/:id", multer().none(), userContoller.deleteUser);

module.exports = router;
