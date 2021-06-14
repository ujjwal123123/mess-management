const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res, next) {
  database.getConnection().then((conn) => {
    const sqlQuery = "select * from Students";

    conn.query(sqlQuery).then((rows) => {
      res.render("student", { items: rows });
      conn.end();
    });
  });
});

// TODO: implement POST method

module.exports = router;
