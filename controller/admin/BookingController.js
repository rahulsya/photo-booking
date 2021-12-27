const Booking = require("../../model/Booking");
const dateFormat = require("dateformat");
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
};
