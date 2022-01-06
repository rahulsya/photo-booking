const { Schema, model } = require("mongoose");

const BookingSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    date_start: {
      type: Date,
      required: true,
    },
    time_start: {
      type: String,
      required: true,
    },
    session: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image_payment_url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("booking", BookingSchema);
