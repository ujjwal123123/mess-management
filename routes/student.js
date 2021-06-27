const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", async function (req, res, next) {
  let conn;

  try {
    conn = await database.getConnection();
    const sql = "select * from Students";
    const students = await conn.query(sql);
    res.render("student", { stduents: students });
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

router.get("/:roll_no", async function (req, res, next) {
  const roll_no = parseInt(req.params.roll_no);

  let conn;
  try {
    conn = await database.getConnection();
    const studentInfo = await conn.query(
      "select * from Students where roll_no=?",
      [roll_no]
    );
    const studentLeaves = await conn.query(
      "select DATE_FORMAT(start_date, '%d %M %Y') as start_date, DATE_FORMAT(end_date, '%d %M %Y') as end_date, remark from Leaves where roll_no=?",
      [roll_no]
    );

    res.render("student_individual", {
      student: studentInfo[0],
      leaves: studentLeaves,
    });
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

module.exports = router;
