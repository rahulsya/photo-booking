const jwt = require("jsonwebtoken");
const User = require("../model/User");
function decodeToken() {
  return async function (req, res, next) {
    try {
      let token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      if (!token) {
        return next();
      }

      req.user = jwt.verify(token, "SO SECRET");

      let user = await User.findOne({ token: { $in: [token] } });

      // jika token tidak ditemukan
      if (!user) {
        return res.json({
          error: 1,
          message: "token expired",
        });
      }
    } catch (error) {
      if (error && error.name === "JsonWebTokenError") {
        return res.json({
          error: 1,
          message: error.message,
        });
      }
      next(error);
    }

    return next();
  };
}

module.exports = { decodeToken };
