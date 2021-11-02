const Photo = require("../../model/Photo");

module.exports = {
  viewDashboard: (req, res) => {
    return res.render("admin/dashboard/viewDashboard", {
      title: "Dashboard",
    });
  },
  viewPhoto: async (req, res) => {
    try {
      const photos = await Photo.find();
      return res.render("admin/photos/view_photos", {
        title: "photos",
        photos,
      });
    } catch (error) {
      res.redirect("/admin/photos");
    }
  },
  addPhoto: async (req, res) => {
    try {
      const { title } = req.body;
      await Photo.create({ title, image_url: `images/${req.file.filename}` });
      res.redirect("/admin/photos");
    } catch (error) {
      res.redirect("/admin/photos");
    }
  },
};
