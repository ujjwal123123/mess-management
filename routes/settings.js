const express = require("express");
const router = express.Router();
const database = require("../database");
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("settings");
});

router.post("/update_password", async function (req, res, next) {
  let conn;

  // TODO: handle expected errors
  try {
    conn = await database.getConnection();
    const rows = await conn.query("SELECT * FROM Users WHERE login_id = ?", [
      req.session.userId,
    ]);

    if (await bcrypt.compare(req.body.current_password, rows[0].login_pass)) {
      const hashPassword = await bcrypt.hash(req.body.new_password, 10); //hash the password
      conn.query("UPDATE Users SET login_pass = ? WHERE (login_id = ?)", [
        hashPassword,
        req.session.userId,
      ]);
      res.redirect("/");
      return;
    } else {
      next(Error("Wrong password entered"));
    }
  } catch (err) {
    next(err);
  } finally {
    if (conn) await conn.end();
  }
});

module.exports = router;
