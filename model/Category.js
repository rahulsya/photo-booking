const { model, Schema } = require("mongoose");

const CategorySchema = Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image_url: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("category", CategorySchema);
