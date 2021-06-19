const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  if (req.session.userId) {
    res.render("index", { title: "Express" });
  } else {
    res.redirect("login"); //-->this should not be change**
  }
});

module.exports = router;
