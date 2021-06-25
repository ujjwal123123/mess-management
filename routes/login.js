const express = require("express");
const database = require("../database");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  if (!req.session.userId) {
    res.render("login");
  } else {
    res.redirect("/");
  }
});

router.post("/", async function (req, res, next) {
  // TODO: handle expected errors
  try {
    const users = await database
      .select()
      .from("Users")
      .where("login_id", req.body.login_id);
    if (await bcrypt.compare(req.body.login_pass, users[0].login_pass)) {
      req.session.userId = req.body.login_id;
      res.redirect("/");
      return;
    }
    next(Error("No user found"));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
