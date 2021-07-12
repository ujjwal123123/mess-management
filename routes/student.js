const express = require("express");
const database = require("../database");
const router = express.Router();
const objectstocsv = require("objects-to-csv");
const fs = require("fs");

let students;
router.get("/", async function (req, res, next) {
  try {
    students = await database("Students").select();
    res.render("student", { students: JSON.stringify(students) });
  } catch (err) {
    next(err);
  }
});

router.get("/download", async function (req, res, next) {
  try {
    const csv = new objectstocsv(students);
    await csv.toDisk("./student_list.csv");
    res.download("./student_list.csv", () => {
      fs.unlinkSync("./student_list.csv");
    });
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

router.delete("/", async function (req, res, next) {
  await database("Students")
    .where({
      roll_no: req.body.value,
    })
    .del();
  res.status(200).json({ message: "Deleted succesfully." });
});

module.exports = router;
