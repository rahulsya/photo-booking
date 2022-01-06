const Booking = require("../../model/Booking");

module.exports = {
  allBooking: async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.json({
        status: "error",
        message: "data token required",
      });
    }

    try {
      const booking = await Booking.find({ user: user._id })
        .sort({ createdAt: "desc" })
        .populate({ path: "user", select: "_id name email" })
        .populate({ path: "category", select: "_id title image_url price" });

      return res.json({
        status: "success",
        booking,
      });
    } catch (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
  },
  store: async (req, res) => {
    try {
      const { session, address, price, category_id, date, time } = req.body;
      const user = req.user;
      if (!user) {
        return res.json({
          status: "error",
          message: "data token required",
        });
      }

      if (!req.file) {
        return res.json({
          status: "error",
          message: "proof payment is required",
        });
      }

      const payload = {
        user: user._id,
        category: category_id,
        date_start: date,
        time_start: time,
        session,
        address,
        price,
        image_payment_url: `images/${req.file.filename}`,
        status: "process",
      };

      const booking = new Booking(payload);
      await booking.save();

      return res.json({
        status: "success",
        booking,
      });
    } catch (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
  },
};
