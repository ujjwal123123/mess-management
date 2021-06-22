const express = require("express");
const router = express.Router();
const database = require("../database");

router.post("/", async function (req, res, next) {
  if (Date.parse(req.body.start_date) > Date.parse(req.body.end_date)) {
    next(Error("INVALID FORMAT: Select end date after start date"));
    return;
  }
  const roll_no = parseInt(req.body.roll_no);

  let conn;
  try {
    conn = await database.getConnection();

    const rows = await conn.query("SELECT * FROM Students WHERE roll_no = ?", [
      roll_no,
    ]);

    if (rows.length !== 1) {
      throw Error("The roll no could not be found in database");
    }

    await conn.query("INSERT INTO Leaves VALUES (?,?,?,?)", [
      roll_no,
      req.body.start_date,
      req.body.end_date,
      req.body.remark,
    ]);
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

module.exports = router;
