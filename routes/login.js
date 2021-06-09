const express = require("express");
const database = require("../database");
const router = express.Router();
// const bcrypt = require("bcrypt")

router.get("/", function (req, res) {
  res.render("login");

});

router.post("/", function (req, res) {
  database
    .getConnection()
    .then((conn) => {
      conn
        .query("Select * from Users where login_id=? and login_pass=? ",
          [
            req.body.login_id,
            req.body.login_pass
          ]
        )
        .then((rows) => {
          if (rows.length == 1) {
            console.log("success");
            res.render('index');
          }
          else {
            console.log("wrong pass");
            res.render('login');
          }
          conn.end();
          // conn.end();
          // res.end("Sucess");
        })
        .catch((err) => {
          // TODO: return error to user
          console.log(err);
          conn.end();
          res.end("Error");
        });
    })
    .catch((err) => {
      console.log(err);
      res.end("Error");
    });
});

module.exports = router;
