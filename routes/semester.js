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
  // TODO: validate data before insertion
  try {
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
