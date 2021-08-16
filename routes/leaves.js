const express = require("express");
const router = express.Router();
const database = require("../database");
const multer = require("multer");
const utils = require("../utils");

//for multer middleware
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'text/plain') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const upload = multer({
  fileFilter,
  storage
});
//for multer middleware
/**
 *
 * @param {Date} start_date leave start date
 * @param {Date} end_date leave end date
 * @param {number} roll_no
 * @returns {Promise<boolean>}
 */


router.post("/", upload.single("attachment"), async function (req, res, next) {
  try {
    const roll_no = parseInt(req.body.roll_no);
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);

    // validate data before insertion
    // date ranges of two leaves must not overlap
    // (StartDate1 < EndDate2) and (StartDate2 < EndDate1) (See https://stackoverflow.com/a/325939/11659427)
    if (
      await database("Leaves")
        .select()
        .where("start_date", "<", end_date)
        .where("end_date", ">", start_date)
        .where("roll_no", roll_no)
        .then((rows) => rows.length)
    ) {
      throw Error("Invalid date entered");
    }

    //FOR .txt files
    const file = req.file;
    let remark = req.body.remark;
    if(file){
      const multerText = Buffer.from(file.buffer).toString("utf-8");
      remark += "\n"+ 'Attachment : '+multerText;
    }

    await database("Leaves").insert({
      roll_no: roll_no,
      start_date: start_date,
      end_date: end_date,
      remark: remark,
    });
    res.redirect("/student/" + roll_no);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  await database("Leaves")
    .where({
      id: req.body.value,
    })
    .del();
  res.status(200).json({ messsage: "Deleted succesfully." });
});

module.exports = router;
