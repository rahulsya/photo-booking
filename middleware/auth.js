module.exports = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    return res.redirect("/admin/signin");
  }
  next();
};
