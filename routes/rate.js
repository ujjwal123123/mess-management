const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", function (req, res) {
  database.getConnection().then((conn) => {
    var sqlQuery =
      "select DATE_FORMAT(start_date,'%d %M %Y') as start_date,rate from Rate;";
    conn
      .query(sqlQuery)
      .then((rows) => {
        res.render("rate", { items: rows });
        conn.end();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
