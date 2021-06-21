const express = require("express");
const router = express.Router();
const database = require("../database");
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("settings");
});

router.post("/update_password", function (req, res, next) {
  database.getConnection().then((conn) => {
    // TODO: handle expected errors
    conn
      .query("SELECT * FROM Users WHERE login_id = ?", [req.session.userId])
      .then(async (rows) => {
        if (
          await bcrypt.compare(req.body.current_password, rows[0].login_pass)
        ) {
          conn.end();
          const hashPassword = await bcrypt.hash(req.body.new_password, 10);
          database.getConnection().then((conn) => {
            conn //hash the password
              .query("UPDATE Users SET login_pass = ? WHERE (login_id = ?)", [
                hashPassword,
                req.session.userId,
              ]);
            conn.end();
          });
          res.redirect("/");

          return;
        } else {
          next(Error("Wrong password entered"));
          conn.end();
        }
      });
  });
});

module.exports = router;
