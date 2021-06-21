const express = require("express");
const router = express.Router();
const database = require("../database");

router.post("/", function (req, res, next) {
  if (Date.parse(req.body.start_date) > Date.parse(req.body.end_date)) {
    next(Error("INVALID FORMAT: Select end date after start date"));
    return;
  }
  database.getConnection().then((conn) => {
    conn
      .query("SELECT * FROM Students WHERE roll_no = ?", [
        parseInt(req.body.roll_no),
      ])
      .then((rows) => {
        if (rows[0]) {
          conn.end();
          database.getConnection().then((conn) => {
            // TODO: validate data before insertion
            conn
              .query("INSERT INTO Leaves VALUES (?,?,?,?);", [
                parseInt(req.body.roll_no),
                req.body.start_date,
                req.body.end_date,
                req.body.remark,
              ])
              .then((data) => {
                conn.end();
              })
              .catch((err) => {
                next(err);
                conn.end();
              });
          });
        } else {
          next(Error("The roll no could not be found in database"));
          conn.end();
          return;
        }
      })
      .catch((err) => {
        next(err);
        conn.end();
      });
  });
});

module.exports = router;
