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
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);
    const year_of_admission = parseInt(req.body.year_of_admission);

    // validate data before insertion
    // date ranges must not overlap
    // (StartDate1 < EndDate2) and (StartDate2 < EndDate1) (See https://stackoverflow.com/a/325939/11659427)
    if (
      await database("Semesters")
        .select()
        .where("start_date", "<", end_date)
        .where("end_date", ">", start_date)
        .where("program", req.body.program)
        .where("year_of_admission", year_of_admission)
        .then((rows) => rows.length > 0)
    ) {
      throw Error("Invalid date entered");
    }

    await database("Semesters").insert({
      start_date: start_date,
      end_date: end_date,
      program: req.body.program,
      year_of_admission: year_of_admission,
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
