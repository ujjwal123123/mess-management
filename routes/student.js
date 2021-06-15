const express = require("express");
const app = require("../app");
const router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session.userId) {
    let roll_no = req.query.roll_no;

    res.render("layout", { name: "Ujjwal Goel", roll_no: roll_no });
  }
  else {
    res.redirect("/");
  }
});

module.exports = router;
