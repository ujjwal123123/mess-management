const express = require("express");
const router = express.Router();
const database = require("../database");
const calculate = require("../calculate");

router.get("/amount_list_data", async function (req, res, next) {
  let url = new URL(req.session.fullUrl);
  let program = url.searchParams.get("program");
  let batch_year = url.searchParams.get("batch_year");
  let month = url.searchParams.get("month");
  let year = url.searchParams.get("year");

  let roll_no_type = batch_year.substring(2, 4);
  if (program == "btech") roll_no_type += "01";
  else if (program == "mtech") roll_no_type += "02";
  else roll_no_type += "03";

  let student_list = await database("Students")
    .select("roll_no", "name")
    .where("roll_no", "like", roll_no_type + "___");

  var data_list = [];
  let date_str = "15 " + month + " " + year; //don't put 01, create timezone error
  let date = new Date(date_str);
  console.log(date);

  for (let i = 0; i < student_list.length; i++) {
    let closingD = await database("Students")
      .select("closing_date")
      .where("roll_no", student_list[i].roll_no);
    let closingDate = new Date(closingD[0].closing_date);

    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (closingDate < firstDay) {
      data_list.push({
        sno: i + 1,
        roll_no: student_list[i].roll_no,
        name: student_list[i].name,
        no_of_days: -1,
        amount: -1,
      });
      continue;
    } else if (closingDate <= lastDay) lastDay = closingDate;

    const getAmount = await calculate.calculateAmount(
      firstDay,
      lastDay,
      student_list[i].roll_no
    );
    data_list.push({
      sno: i + 1,
      roll_no: student_list[i].roll_no,
      name: student_list[i].name,
      no_of_days: getAmount[1],
      amount: getAmount[0],
    });
  }

  res.json(data_list);
});

module.exports = router;
