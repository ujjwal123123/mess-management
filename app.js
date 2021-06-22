const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
require("dotenv").config();

const indexRouter = require("./routes/index");
const studentRouter = require("./routes/student");
const semesterRouter = require("./routes/semester");
const rateRouter = require("./routes/rate");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const settingsRouter = require("./routes/settings");
const leavesRouter = require("./routes/leaves");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  // Redirect user to login page if he is not logged in
  if (
    process.env.NODE_ENV != "development" &&
    !req.session.userId &&
    req.path != "/login"
  ) {
    res.redirect("/login");
    return;
  }
  next();
});
app.use(function (req, res, next) {
  res.locals.userId = req.session.userId;
  next();
});

app.use("/", indexRouter);
app.use("/student", studentRouter);
app.use("/semester", semesterRouter);
app.use("/rate", rateRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/settings", settingsRouter);
app.use("/leaves", leavesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.stack =
    req.app.get("env") === "development" ? err.stack : undefined;

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
