const express = require("express");
const router = express.Router();
const database = require("../database");

router.post("/", async function (req, res, next) {
  if (Date.parse(req.body.start_date) > Date.parse(req.body.end_date)) {
    next(Error("INVALID FORMAT: Select end date after start date"));
    return;
  }
  const roll_no = parseInt(req.body.roll_no);

  try {
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
