const express = require("express");
const database = require("../database");
const router = express.Router();

router.post("/", function (req, res) {
  database
    .getConnection()
    .then((conn) => {
      // TODO: validate data before insertion
      conn
        // .query(
        //   "INSERT INTO Rate (start_date, rate) VALUES (?,?);",
        //   [
        //     req.body.start_date,
        //     req.body.rate,
        //   ]
        // )
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
