const Photo = require("../../model/Photo");
const User = require("../../model/User");
const Booking = require("../../model/Booking");
const fs = require("fs");
const path = require("path");

module.exports = {
  viewDashboard: async (req, res) => {
    const dataUser = await User.find();
    const dataBooking = await Booking.find();
    const dataPhoto = await Photo.find();
    return res.render("admin/dashboard/viewDashboard", {
      title: "Dashboard",
      user: req.session.user,
      totalUser: dataUser.length,
      totalBooking: dataBooking.length,
      totalPhoto: dataPhoto.length,
    });
  },
  viewPhoto: async (req, res) => {
    try {
      const photos = await Photo.find();
      return res.render("admin/photos/view_photos", {
        title: "photos",
        photos,
        user: req.session.user,
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
  editPhoto: async (req, res) => {
    try {
      const { title, id, image } = req.body;
      const photo = await Photo.findOne({ _id: id });
      if (req.file == undefined) {
        photo.title = title;
        await photo.save();

        res.redirect("/admin/photos");
      } else {
        const imagePath = path.join(`public/${photo.image_url}`);
        if (fs.existsSync(imagePath)) {
          await fs.unlinkSync(imagePath);
        }
        photo.title = title;
        photo.image_url = `images/${req.file.filename}`;
        await photo.save();

        res.redirect("/admin/photos");
      }
    } catch (error) {
      res.redirect("/admin/photos");
    }
  },
  deletePhoto: async (req, res) => {
    try {
      const { id } = req.params;
      const photo = await Photo.findOneAndDelete({ _id: id });
      const currentImage = `./public/${photo.image_url}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      res.redirect("/admin/photos");
    } catch (error) {
      res.redirect("/admin/photos");
    }
  },
};
