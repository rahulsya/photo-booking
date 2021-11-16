const User = require("../../model/User");
const bcrypt = require("bcrypt");

module.exports = {
  viewUsers: async (req, res) => {
    const users = await User.find();
    return res.render("admin/users/view_users", {
      title: "users",
      users,
      user: req.session.user,
    });
  },
  addUser: async (req, res) => {
    try {
      const payload = req.body;

      let user = new User(payload);
      await user.save();

      return res.redirect("/admin/users");
    } catch (error) {
      return res.redirect("/admin/users");
    }
  },
  updateUser: async (req, res) => {
    try {
      let {
        id,
        name,
        email,
        password,
        phone_number,
        job_title,
        address,
        role,
      } = req.body;

      let payload = { id, name, email, phone_number, job_title, address, role };

      if (password) {
        const newpassword = await bcrypt.hash(password, 10);
        payload = { ...payload, password: newpassword };
      }

      await User.findByIdAndUpdate({ _id: payload.id }, payload);

      return res.redirect("/admin/users");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/admin/users");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findOneAndDelete({ _id: id });
      return res.redirect("/admin/users");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/admin/users");
    }
  },
};
