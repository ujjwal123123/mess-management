const express = require("express");
const router = express.Router();
const database = require("../database");

router.post("/", function (req, res) {
  if (Date.parse(req.body.start_date) > Date.parse(req.body.end_date)) {
    console.log("INVALID FORMAT :Select end date after start date");
    res.redirect("/");
    return;
  }
  if (req.session.userId) {
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
                  console.log("leave inserted successfully");
                  conn.end();
                  res.redirect("/");
                })
                .catch((err) => {
                  console.log(
                    "roll_no check was successfull but inserting data into database creating error"
                  );
                  console.log(err);
                  conn.end();
                  res.end("error"); //sent to error page
                });
            });
          } else {
            conn.end();
            console.log("given roll no is not found in Student database ");
            res.redirect("/");
          }
        })
        .catch((err) => {
          //catch statement ->if opening database creates some error
          console.log(
            "Student varification is unsuccessful and creating error"
          );
          console.log(err);
          conn.end();
          res.end("error"); //sent to error page
        });
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
