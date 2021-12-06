const Booking = require("../../model/Booking");
const dateFormat = require("dateformat");
module.exports = {
  viewBooking: async (req, res) => {
    const booking = await Booking.find().populate("user").populate("category");
    console.log(booking);
    return res.render("admin/booking/view_booking", {
      title: "Booking",
      booking,
      dateFormat,
      user: req.session.user,
    });
  },
};
