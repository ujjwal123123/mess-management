const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    req.session.fullUrl = fullUrl;
    res.render("amount_list");
  } catch (err) {
    next(err);
  }
});


module.exports = router;
