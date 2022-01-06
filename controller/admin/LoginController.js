const User = require("../../model/User");
const bcrypt = require("bcrypt");

module.exports = {
  actionLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ name: username });

      if (!user) {
        req.flash("alertMessage", "User Not Found");
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/signin");
      }
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        req.flash("alertMessage", "Wrong User Or Password");
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/signin");
      }

      if (user.role === "user") {
        req.flash("alertMessage", `Role "User" Not Allowed`);
        req.flash("alertStatus", "danger");
        return res.redirect("/admin/signin");
      }

      req.session.user = {
        id: user.id,
        name: user.name,
      };

      return res.redirect("/admin");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/admin/signin");
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy();
    return res.redirect("/admin/signin");
  },
};
