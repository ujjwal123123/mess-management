const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res) {
  database
    .getConnection()
    .then((conn) => {
      var sqlQuery =
        "select  DATE_FORMAT(start_date,'%d %M %Y') as start_date, DATE_FORMAT(end_date,'%d %M %Y') as end_date,program,year_of_admission  from Semesters;";

      conn
        .query(sqlQuery)
        .then((rows) => {
          res.render("semester", { items: rows });
          conn.end();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/", function (req, res) {
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
      res.end("Error");
    });
});

module.exports = router;
