require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const flash = require("connect-flash");
const { decodeToken } = require("./middleware/DecodeToken");
// to allow put and delete method
const methodOverride = require("method-override");
const session = require("express-session");

var indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");
// conect db
const db = require("./database/index");
db.on("open", () => {
  console.log("db connected");
});

var app = express();

// cors
app.use(cors());
app.use(decodeToken());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// use overridemethod
app.use(methodOverride("_method"));
// use session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sbAdmin2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
