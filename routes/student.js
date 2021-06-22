const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res, next) {
  database.getConnection().then((conn) => {
    const sqlQuery = "select * from Students";

    conn.query(sqlQuery).then((rows) => {
      res.render("student", { students: rows });
      conn.end();
    });
  });
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
