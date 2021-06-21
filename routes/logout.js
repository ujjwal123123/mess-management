const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  if (req.session.userId) {
    req.session.destroy();
  }
  res.redirect("login");
});

module.exports = router;
