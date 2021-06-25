const express = require("express");
const database = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  if (!req.session.userId) {
    res.render("login");
  } else {
    res.redirect("/");
  }
});

router.post("/", async function (req, res, next) {
  let conn;

  // TODO: handle expected errors
  try {
    conn = await database.getConnection();
    const rows = await conn.query("SELECT * FROM Users WHERE login_id = ?", [
      req.body.login_id,
    ]);
    if (await bcrypt.compare(req.body.login_pass, rows[0].login_pass)) {
      req.session.userId = req.body.login_id;
      res.redirect("/");
      conn.end();
      return;
    }
    next(Error("No user found"));
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

module.exports = router;
