const express = require("express");
const router = express.Router();
const database = require("../database");

/**
 *
 * @param {Date} date
 * @param {number} roll_no
 * @returns {Promise<boolean>}
 */
async function dateInLeaves(date, roll_no) {
  const rows = await database("Leaves")
    .where("start_date", "<=", date)
    .where("end_date", ">", date)
    .where("roll_no", roll_no);

  return rows.length > 0;
}

router.post("/", async function (req, res, next) {
  try {
    const roll_no = parseInt(req.body.roll_no);

    // validate data before insertion
    // req.body.start_date must not lie insdie a leave

    if (await dateInLeaves(req.body.start_date, roll_no)) {
      throw Error("Invalid start date entered");
    }

    // req.body.end_date must not lie inside a leave
    if (await dateInLeaves(req.body.end_date, roll_no)) {
      throw Error("Invalid end date entered");
    }

    if (Date.parse(req.body.start_date) > Date.parse(req.body.end_date)) {
      throw Error("INVALID FORMAT: Select end date after start date");
    }

    const students = await database("Students")
      .select()
      .where("roll_no", roll_no);

    if (students.length !== 1) {
      throw Error("The roll no could not be found in database");
    }

    await database("Leaves").insert({
      roll_no: roll_no,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
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
