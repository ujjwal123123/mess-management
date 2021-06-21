const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res, next) {
  database
    .getConnection()
    .then((conn) => {
      const sqlQuery =
        "select DATE_FORMAT(start_date, '%d %M %Y') as start_date, DATE_FORMAT(end_date,'%d %M %Y') as end_date, program, year_of_admission from Semesters";

      conn
        .query(sqlQuery)
        .then((rows) => {
          res.render("semester", { items: rows });
          conn.end();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.post("/", function (req, res, next) {
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
          conn.end();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.delete("/", function (req, res) {
  database.getConnection().then((conn) => {
    conn
      .query(
        "DELETE FROM Semesters WHERE start_date=? AND program=? AND year_of_admission=?",
        [req.body.start_date, req.body.program, req.body.year_of_admission]
      )
      .then(() => {
        res.status(200).json({ messsage: "Deleted succesfully." });
      });
  });
});

module.exports = router;
