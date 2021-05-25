var express = require("express");
var router = express.Router();

// GET home page
router.get("/", function (req, res, next) {
  let roll_no = req.query.roll_no;

  res.render("student", { name: "Ujjwal Goel", roll_no: roll_no });
});

module.exports = router;
