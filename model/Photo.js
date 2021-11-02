const { model, Schema } = require("mongoose");

const PhotoSchema = Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image_url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("photo", PhotoSchema);
