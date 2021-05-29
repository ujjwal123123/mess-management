const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("semester");
});

router.post("/", function (req, res, next) {
  console.log(req.body);

  database
    .getConnection()
    .then((conn) => {
      // TODO: validate data before insertion
      conn
        .query(
          "INSERT INTO Semesters (start_date, end_date, program, year_of_admission) VALUES (?,?,?,?);",
          [
            req.body.start_date,
            req.body.end_date,
            req.body.program,
            req.body.year_of_admission,
          ]
        )
        .then((data) => {
          console.log(`${data} inserted`);
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
      conn.end();
      res.end("Error");
    });
});

module.exports = router;
