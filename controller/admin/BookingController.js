const Booking = require("../../model/Booking");
const dateFormat = require("dateformat");
const fs = require("fs");
module.exports = {
  viewBooking: async (req, res) => {
    const booking = await Booking.find()
      .sort({ createdAt: "desc" })
      .populate("user")
      .populate("category");
    return res.render("admin/booking/view_booking", {
      title: "Booking",
      booking,
      dateFormat,
      user: req.session.user,
    });
  },
  detailBooking: async (req, res) => {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate({ path: "user", select: "_id name email" })
      .populate({ path: "category", select: "_id title image_url price" });
    return res.render("admin/booking/view_detailbooking", {
      title: "Detail Booking",
      user: req.session.user,
      booking,
      dateFormat,
    });
  },

  filterBooking: async (req, res) => {
    const { date1, date2 } = req.body;
    // if (date1 === date2) {
    //   const booking = await Booking.find({
    //     date_start: date1,
    //   })
    //     .populate("user")
    //     .populate("category");
    //   console.log(new Date(date1));
    //   return res.json(booking);
    // }

    const booking = await Booking.find({
      date_start: { $gte: date1, $lte: date2 },
    })
      .sort({ createdAt: "desc" })
      .populate("user")
      .populate("category");
    return res.render("admin/booking/view_booking", {
      title: "Booking",
      booking,
      dateFormat,
      user: req.session.user,
    });
  },

  confirmationBooking: async (req, res) => {
    try {
      const { id } = req.params;
      await Booking.findOneAndUpdate({ _id: id }, { status: "success" });
      return res.redirect(`/admin/booking/${id}`);
    } catch (error) {
      return res.redirect(`/admin/booking/${id}`);
    }
  },

  rejectBooking: async (req, res) => {
    try {
      const { id } = req.params;
      await Booking.findOneAndUpdate({ _id: id }, { status: "reject" });
      return res.redirect(`/admin/booking/${id}`);
    } catch (error) {
      return res.redirect(`/admin/booking/${id}`);
    }
  },
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findOneAndDelete({ _id: id });
      const imagePath = `./public/${booking.image_payment_url}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      return res.redirect(`/admin/booking`);
    } catch (error) {
      return res.redirect(`/admin/booking`);
    }
  },
};
