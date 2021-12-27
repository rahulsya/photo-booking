const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ name: username });

      if (!user)
        return res.status(401).json({
          status: "error",
          message: "account not found",
        });
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          status: "error",
          message: "username or password incorrect",
        });
      }
      const { _id, name, email, address, job_title, phone_number } = user;

      const signed = jwt.sign(
        { _id, name, email, address, job_title, phone_number },
        "SO SECRET"
      );

      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { token: signed } },
        { new: true }
      );

      return res.json({
        status: "success",
        user: {
          _id,
          name,
          email,
          address,
          job_title,
          phone_number,
        },
        token: signed,
      });
    } catch (error) {
      return res.json({
        status: "error",
        messsage: error.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      const { password, ...data } = req.body;

      const hashPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ ...data, password: hashPassword });
      await newUser.save();

      return res.json({
        status: "success",
        data: newUser,
      });
    } catch (error) {
      return res.json({
        status: "error",
        messsage: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      let token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      let user = await User.findOneAndUpdate(
        { token: { $in: [token] } },
        { $pull: { token } },
        { useFindAndModify: false }
      );

      if (!token || !user) {
        return res.status(404).json({
          status: "error",
          message: "user not found, token expired",
        });
      }

      return res.json({
        status: "success",
        message: "Logut berhasil",
      });
    } catch (error) {
      return res.json({
        status: "error",
        messsage: error.message,
      });
    }
  },
};
