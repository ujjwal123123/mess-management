const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", async function (req, res, next) {
  let conn;

  try {
    conn = await database.getConnection();
    const sql =
      "select DATE_FORMAT(start_date, '%d %M %Y') as start_date, rate from Rate";
    const rates = await conn.query(sql);
    res.render("rate", { items: rates });
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
    await conn.query("INSERT INTO Rate (start_date, rate) VALUES (?,?)", [
      req.body.start_date,
      req.body.rate,
    ]);
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

module.exports = router;
