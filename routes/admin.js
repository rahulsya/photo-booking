const router = require("express").Router();
const { adminContoller } = require("../controller");
const { uploadSingel } = require("../middleware/multer");

router.get("/signin", (req, res) => {
  return res.render("index", { title: "Login" });
});
router.get("/photos", adminContoller.viewPhoto);
router.post("/photo", uploadSingel, adminContoller.addPhoto);
router.get("/", adminContoller.viewDashboard);

module.exports = router;
