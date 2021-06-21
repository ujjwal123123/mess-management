const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session.userId) {
    req.session.destroy((err) => next(err));
  }
  res.redirect("login");
});

module.exports = router;
