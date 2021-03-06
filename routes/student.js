const express = require("express");
const database = require("../database");
const router = express.Router();
const calculate = require("../calculate");

router.get("/", async function (req, res, next) {
  try {
    res.render("student");
  } catch (err) {
    next(err);
  }
});

router.get("/json", async function (req, res, next) {
  try {
    const students = await database
      .select(
        "Students.name as name",
        "email",
        "roll_no",
        "Hostels.name as hostel_name"
      )
      .from("Students")
      .join("Hostels", { hostel_id: "id" });
    res.json(students);
  } catch (err) {
    next(err);
  }
});

router.get("/amount/:roll_no", async function (req, res, next) {
  const roll_no = parseInt(req.params.roll_no);
  try {
    calculate.getAmountList(roll_no).then((data) => {
      res.json(data);
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

router.get("/delete/:roll_no", async function (req, res, next) {
  const roll_no = req.params.roll_no;
  try {
    await database("Students")
      .where({
        roll_no: roll_no,
      })
      .del();
    res.redirect("/student");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
