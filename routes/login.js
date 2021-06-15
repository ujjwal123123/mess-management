const express = require("express");
const database = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  if (!req.session.userId) {
    res.render("login");
  }
  else {
    res.redirect("/");
  }
});

router.post("/", async function (req, res) {
  if (!req.session.userId) {
    database.getConnection().then((conn) => {
      // TODO: handle expected errors
      conn
        .query("SELECT * FROM Users WHERE login_id = ?", [req.body.login_id])
        .then(async (rows) => {
          if (
            rows[0].login_id == req.body.login_id &&
            (await bcrypt.compare(req.body.login_pass, rows[0].login_pass))
          ) {
            console.log("password match perfectly");
            req.session.userId = req.body.login_id;
            res.redirect("/");
            conn.end();
            return;
          }
          res.redirect("login");
          console.log("no user found");
          conn.end();
        });
    })
  }
  else {
    res.redirect("/");
  }
});

module.exports = router;
