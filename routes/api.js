const router = require("express").Router();

router.get("/", (req, res) => {
  return res.json({
    status: "success",
    message: "this api",
  });
});

module.exports = router;
