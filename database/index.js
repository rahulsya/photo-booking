const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_URI_DEV}`);

const db = mongoose.connection;
module.exports = db;
