const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const students = await database("Students").select();
    res.render("student", { students: students });
  } catch (err) {
    next(err);
  }
});

router.get("/:roll_no", async function (req, res, next) {
  const roll_no = parseInt(req.params.roll_no);

  try {
    const studentInfo = await database("Students")
      .select()
      .where("roll_no", roll_no);
    const studentLeaves = await database("Leaves")
      .select()
      .where("roll_no", roll_no);

    res.render("student_individual", {
      student: studentInfo[0],
      leaves: studentLeaves,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
