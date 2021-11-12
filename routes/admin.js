const router = require("express").Router();
const { adminContoller, userContoller } = require("../controller");
const multer = require("multer");
const { uploadSingel } = require("../middleware/multer");

router.get("/", adminContoller.viewDashboard);
router.get("/signin", (req, res) => {
  return res.render("index", { title: "Login" });
});

// photos
router.get("/photos", adminContoller.viewPhoto);
router.put("/photo", uploadSingel, adminContoller.editPhoto);
router.post("/photo", uploadSingel, adminContoller.addPhoto);
router.delete("/photo/:id", adminContoller.deletePhoto);

// users
router.get("/users", userContoller.viewUsers);
router.post("/users", multer().none(), userContoller.addUser);
router.put("/users", multer().none(), userContoller.updateUser);
router.delete("/users/:id", multer().none(), userContoller.deleteUser);

module.exports = router;
