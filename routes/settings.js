const express = require("express");
const router = express.Router();
const database = require("../database");
const bcrypt = require("bcrypt");

router.get("/", function (req, res) {
  res.render("settings");
});

router.post("/update_password", async function (req, res, next) {
  // TODO: handle expected errors
  try {
    const rows = await database("Users")
      .select()
      .where("login_id", req.session.userId);

    if (await bcrypt.compare(req.body.current_password, rows[0].login_pass)) {
      const hashPassword = await bcrypt.hash(req.body.new_password, 10); //hash the password
      database("Users")
        .where("login_id", req.session.userId)
        .update("login_pass", hashPassword);
      res.redirect("/settings");
      return;
    } else {
      next(Error("Wrong password entered"));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
