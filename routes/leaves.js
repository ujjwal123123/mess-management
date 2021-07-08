const express = require("express");
const router = express.Router();
const database = require("../database");
const utils = require("../utils");

/**
 *
 * @param {Date} start_date leave start date
 * @param {Date} end_date leave end date
 * @param {number} roll_no
 * @returns {Promise<boolean>}
 */
async function leaveInSemester(start_date, end_date, roll_no) {
  // TODO: this code does not work and needs testing
  if (
    await database("Semesters")
      .select()
      .where("program", utils.getProgram(roll_no))
      .where("year_of_admission", utils.getYearOfAdmission(roll_no))
      .where(function () {
        this.where(function () {
          this.where("start_date", ">", start_date).where(
            "start_date",
            "<",
            end_date
          );
        }).orWhere(function () {
          this.where("end_date", ">", start_date).where(
            "end_date",
            ">",
            end_date
          );
        });
      })
      .then((rows) => rows.length > 0)
  ) {
    return false;
  }

  return true;
}

router.post("/", async function (req, res, next) {
  try {
    const roll_no = parseInt(req.body.roll_no);
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);

    // validate data before insertion
    // date ranges of two leaves must not overlap
    // (StartDate1 < EndDate2) and (StartDate2 < EndDate1) (See https://stackoverflow.com/a/325939/11659427)
    if (
      await database("Leaves")
        .select()
        .where("start_date", "<", end_date)
        .where("end_date", ">", start_date)
        .where("roll_no", roll_no)
        .then((rows) => rows.length)
    ) {
      throw Error("Invalid date entered");
    }

    // if (await leaveInSemester(start_date, end_date, roll_no)) {
    //   throw Error("Invalid date entered");
    // }

    await database("Leaves").insert({
      roll_no: roll_no,
      start_date: start_date,
      end_date: end_date,
      remark: req.body.remark,
    });
    res.redirect("/student/" + roll_no);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  await database("Leaves")
    .where({
      id: req.body.value,
    })
    .del();
  res.status(200).json({ messsage: "Deleted succesfully." });
});

module.exports = router;
