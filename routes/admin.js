const router = require("express").Router();
const { adminContoller } = require("../controller");
const { uploadSingel } = require("../middleware/multer");

router.get("/", adminContoller.viewDashboard);
router.get("/signin", (req, res) => {
  return res.render("index", { title: "Login" });
});
router.get("/photos", adminContoller.viewPhoto);
router.put("/photo", uploadSingel, adminContoller.editPhoto);
router.post("/photo", uploadSingel, adminContoller.addPhoto);
router.delete("/photo/:id", adminContoller.deletePhoto);

module.exports = router;
