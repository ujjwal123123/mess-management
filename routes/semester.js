const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const semesters = await database("Semesters").select();
    res.render("semester", { items: semesters });
  } catch (err) {
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    // validate data before insertion
    // req.body.start_date must not lie inside a semester
    const start_date_array = await database("Semesters").whereRaw(
      "start_date < ? AND end_date > ? AND program = ? AND year_of_admission = ?",
      [
        req.body.end_date,
        req.body.end_date,
        req.body.program,
        req.body.year_of_admission,
      ]
    );
    if (start_date_array.length > 0) {
      throw Error("Invalid start date entered");
    }
    // req.body.end_date must not lie inside a semester
    const end_date_array = await database("Semesters").whereRaw(
      "start_date < ? AND end_date > ? AND program = ? AND year_of_admission = ?",
      [
        req.body.end_date,
        req.body.end_date,
        req.body.program,
        req.body.year_of_admission,
      ]
    );
    if (end_date_array.length > 0) {
      throw Error("Invalid end date entered");
    }

    if (Date.parse(req.body.end_date) <= Date.parse(req.body.start_date)) {
      throw Error("End date must be after start date");
    }

    await database("Semesters").insert({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      program: req.body.program,
      year_of_admission: req.body.year_of_admission,
    });
    res.redirect("/semester");
  } catch (err) {
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  await database("Semesters")
    .where({
      id: req.body.value,
    })
    .del();
  res.status(200).json({ messsage: "Deleted succesfully." });
});

module.exports = router;
