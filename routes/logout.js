const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  if (req.session.userId) {
    req.session.destroy(function (err) {
      if (err) {
        req.render("index");//if will not logout successfully
      }
    })
    console.log("are you sure to log out!!!");
    res.redirect("/");
  }
  else {
    res.redirect("/");
  }
});


module.exports = router;
