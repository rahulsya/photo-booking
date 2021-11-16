const User = require("../../model/User");
const bcrypt = require("bcrypt");

module.exports = {
  actionLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ name: username });
      if (!user) {
        return res.redirect("/admin/signin");
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.redirect("/admin/signin");
      }

      req.session.user = {
        id: user.id,
        name: user.name,
      };
      return res.redirect("/admin");
    } catch (error) {
      return res.redirect("/admin/signin");
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy();
    return res.redirect("/admin/signin");
  },
};
