const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const studentRouter = require("./routes/student");
const semesterRouter = require("./routes/semester");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/student", studentRouter);
app.use("/semester", semesterRouter);
app.use("/addSemester", semesterRouter)

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 5,
  database: process.env.DB_NAME,
});

pool
  .getConnection()
  .then((conn) => {
    conn
      .query("select * from Semesters")
      .then((rows) => console.log(rows))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

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
