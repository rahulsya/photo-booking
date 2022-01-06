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

UserSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").count({ email: value });

      // jika user ditemukan makan akan false
      // jika tidak ditemukan akan true

      // jika false maka validasi gagal
      // jika true maka validasi behasil

      // harus di kasi true
      return !count;
    } catch (error) {
      throw error;
    }
  },
  // kalo false
  (attr) => `${attr.value} sudah terdaftar`
);

const HASH_ROUND = 10;

UserSchema.pre("save", function (next) {
  this.password = hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = model("User", UserSchema);
