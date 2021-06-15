const express = require("express");
const session = require("express-session");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res, next) {
  database.getConnection().then((conn) => {
    if (req.session.userId) {
      const sqlQuery = "select * from Students";

      conn.query(sqlQuery).then((rows) => {
        res.render("student", { items: rows });
        conn.end();
      });
    }
    else {
      res.redirect("/");
    }
  });
});

// TODO: implement POST method

module.exports = router;
