const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("login");

});

router.post("/", function (req, res) {
  database
    .getConnection()
    .then((conn) => {
      // TODO: validate data before insertion
      conn
        .query("Select * from Users;",[])
        .then((rows) => {
          var id = req.body.loginId;
          var pass = req.body.loginPass;
          // console.log(rows);
          console.log('id is '+id+' pass is '+pass);
          conn.end();
          res.end("Sucess");
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
