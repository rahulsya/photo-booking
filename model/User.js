const { hashSync } = require("bcrypt");
const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone_number: {
      type: Number,
    },
    job_title: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

const HASH_ROUND = 10;

UserSchema.pre("save", function (next) {
  this.password = hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = model("User", UserSchema);
