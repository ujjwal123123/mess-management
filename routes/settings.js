const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  if (req.session.userId) {
    res.render("settings");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
