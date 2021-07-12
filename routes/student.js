const express = require("express");
const database = require("../database");
const router = express.Router();
const objectstocsv = require("objects-to-csv");
const fs = require("fs");

router.get("/", async function (req, res, next) {
  try {
    res.render("student");
  } catch (err) {
    next(err);
  }
});

router.get("/json", async function (req, res, next) {
  try {
    const students = await database("Students as s")
      .join("Hostels as h","h.id","s.hostel_id")
      .select("h.name","s.name")
      .where({hostel_id : id});
    console.log(students);
    res.json(students);
  } catch (err) {
    next(err);
  }
});

/** @deprecated */
router.get("/download", async function (req, res, next) {
  try {
    const students = await database("Students").select();
    const csv = new objectstocsv(students);
    const filepath = "public/csv/student_list.csv";
    await csv.toDisk(filepath);
    res.download(filepath, () => {
      fs.unlinkSync(filepath);
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
