const express = require("express");
const router = express.Router();
const database = require("../database");
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  if (req.session.userId) {
    res.render("settings");
  } else {
    res.redirect("/");
  }
});

router.post("/update_password", function (req, res) {
  if (req.session.userId) {
    let cPass = req.body.current_password;
    let nPass = req.body.new_password; //$2b$10$BWRGottmRk7cPE7BawRPi.RxbdHBbJJEqU08DKkXo.YOZdxjg7ZsC
    let uName = req.session.userId; // console.log("cpass"+cPass+" npass"+nPass+" uname"+uName);
    database.getConnection().then((conn) => {
      // TODO: handle expected errors
      conn
        .query("SELECT * FROM Users WHERE login_id = ?", [uName])
        .then(async (rows) => {
          if (await bcrypt.compare(cPass, rows[0].login_pass)) {
            console.log("password match perfectly");
            conn.end();
            database.getConnection().then((conn) => {
              conn //hash the password
                .query("UPDATE Users SET login_pass = ? WHERE (login_id = ?)", [
                  nPass,
                  uName,
                ]);
              conn.end();
            });
            res.redirect("/");

            return;
          } else {
            console.log("you entered wrong password");
            conn.end();
            res.redirect("/");
          }
        });
    });
  } else {
    console.log("please login first");
    res.redirect("/");
  }
});

module.exports = router;
