const express = require("express");
const database = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("login");
});

router.post("/", async function (req, res, next) {
  database
    .getConnection()
    .then((conn) => {
      conn
        .query("Select * from Users ", [])
        .then(async (rows) => {
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].login_id == req.body.login_id) {
              try {
                if (
                  await bcrypt.compare(req.body.login_pass, rows[i].login_pass)
                ) {
                  console.log("password match perfectly");
                  conn.end();
                  res.render("index");
                } else {
                  console.log("user enter wrong password");
                  conn.end();
                  res.render("login");
                }
                break;
              } catch {
                console.log("catch found");
                conn.end();
                res.end("Error");
              }
            }
          } //for loop end
          console.log("no user found");
          res.render("login");
          conn.end();
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
