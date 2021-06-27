const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", async function (req, res, next) {
  let conn;

  try {
    conn = await database.getConnection();
    const sql =
      "select DATE_FORMAT(start_date, '%d %M %Y') as start_date, DATE_FORMAT(end_date,'%d %M %Y') as end_date, program, year_of_admission from Semesters";
    const semesters = await conn.query(sql);
    res.render("semester", { items: semesters });
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

router.post("/", async function (req, res, next) {
  let conn;

  // TODO: validate data before insertion
  try {
    conn = await database.getConnection();
    const sql =
      "INSERT INTO Semesters (start_date, end_date, program, year_of_admission) VALUES (?,?,?,?)";
    await conn.query(sql, [
      req.body.start_date,
      req.body.end_date,
      req.body.program,
      req.body.year_of_admission,
    ]);
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

router.delete("/", async function (req, res, next) {
  let conn;

  try {
    conn = await database.getConnection();
    const sql =
      "DELETE FROM Semesters WHERE start_date=? AND program=? AND year_of_admission=?";
    await conn.query(sql, [
      req.body.start_date,
      req.body.program,
      req.body.year_of_admission,
    ]);
    res.status(200).json({ messsage: "Deleted succesfully." });
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

module.exports = router;
