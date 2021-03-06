const express = require("express");
const database = require("../database");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const rates = await database("Rate").select();
    res.render("rate", { items: rates });
  } catch (err) {
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  // TODO: validate data before insertion
  try {
    await database("Rate").insert({
      start_date: req.body.start_date,
      rate: req.body.rate,
    });
    res.redirect("/rate");
  } catch (err) {
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  await database("Rate")
    .where({
      start_date: req.body.value,
    })
    .del();
  res.status(200).json({ messsage: "Deleted succesfully." });
});

module.exports = router;
