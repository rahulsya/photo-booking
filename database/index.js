const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_URI_PROD}`);

const db = mongoose.connection;
module.exports = db;
