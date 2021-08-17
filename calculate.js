const database = require("./database");
const utils = require("./utils");

/**
 * Returns mess on a given date using `Rate` table of the database
 * @param {Date} date
 * @returns {Promise<number>}
 */
async function rateOnDate(date) {
  const rateTable = await database("Rate")
    .where("start_date", "<=", date)
    .orderBy("start_date");

  const len = rateTable.length;
  if (len === 0) {
    throw Error("Rate does not exist");
  }

  return rateTable[len - 1].rate;
}

/**
 * Returns `true` is a student is present in hostel on a given date
 * @param {Date} date
 * @param {number} roll_no
 * @returns {Promise<boolean>}
 */
async function isPresentOnDate(date, roll_no) {
  utils.assert(roll_no.toString().length == 7);
  const yearOfAdmission = utils.getYearOfAdmission(roll_no);
  const program = utils.getProgram(roll_no);

  const semesterTable = await database("Semesters")
    .where("start_date", "<=", date)
    .where("end_date", ">=", date)
    .where("program", program)
    .where("year_of_admission", yearOfAdmission);

  utils.assert(semesterTable.length == 1 || semesterTable.length == 0);

  const leavesTable = await database("Leaves")
    .where("start_date", "<=", date)
    .where("end_date", ">=", date)
    .where("roll_no", roll_no);

  utils.assert(leavesTable.length == 1 || leavesTable.length == 0);

  // TODO: maybe we can just use XOR :-)
  if (leavesTable.length == 0 && semesterTable.length == 0) {
    return false;
  } else if (leavesTable.length == 1 && semesterTable.length == 0) {
    return true;
  } else if (leavesTable.length == 0 && semesterTable.length == 1) {
    return true;
  } else if (leavesTable.length == 1 && semesterTable.length == 1) {
    return false;
  }
  utils.assert(false); // this line should not be reached
}

/**
 *
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {number} roll_no
 * @returns {Promise<Array>}
 */
async function calculateAmount(start_date, end_date, roll_no) {
  utils.assert(start_date < end_date);

  let amount = 0;
  let daysPresent = 0;

  let itr_date = start_date;

  while (itr_date <= end_date) {
    //MUST HAVE TO CONVERT ITR-DATE TO STRING
    var loop_date = itr_date.toLocaleString(undefined, {
      timeZone: "Asia/Kolkata",
    });
    loop_date =
      loop_date.substring(6, 10) +
      "-" +
      loop_date.substring(3, 5) +
      "-" +
      loop_date.substring(0, 2);

    if (await isPresentOnDate(loop_date, roll_no)) {
      amount += await rateOnDate(loop_date);
      daysPresent++;
    }
    itr_date.setDate(itr_date.getDate() + 1);
  }

  return [amount, daysPresent];
}

/**
 *
 * @param {number} roll_no
 * @returns
 */
async function getAmountList(roll_no) {
  const program = utils.getProgram(roll_no);
  const yearOfAdmission = utils.getYearOfAdmission(roll_no);
  let amountList = [];

  const semesters = await database("Semesters")
    .select()
    .where("year_of_admission", yearOfAdmission)
    .where("program", program);

  let miniDate = semesters[0].start_date; //select the very 1st semester date of student
  for (let i = 0; i < semesters.length; i++) {
    if (semesters[i].start_date < miniDate) {
      miniDate = semesters[i].start_date;
    }
  }

  let startDate = new Date(miniDate);
  startDate.setMonth(startDate.getMonth() - 1); //some adjustment [don't remove IMP]
  let currentDate = new Date();
  let closingD = await database("Students")
    .select("closing_date")
    .where("roll_no", roll_no);
  let closingDate = new Date(closingD[0].closing_date);

  if (currentDate - closingDate > 0) currentDate = closingDate;
  console.log(currentDate + "----" + startDate);
  while (currentDate >= startDate) {
    const Start =
      currentDate.getFullYear().toString() +
      "-" +
      (currentDate.getMonth() + 1).toString() +
      "-01";
    const End =
      currentDate.getFullYear().toString() +
      "-" +
      (currentDate.getMonth() + 1).toString() +
      "-" +
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        .getDate()
        .toString();
    const row = await calculateAmount(new Date(Start), new Date(End), roll_no);
    var month_name = currentDate.toDateString();
    month_name = month_name.substring(4, 8) + month_name.substring(11, 15);
    amountList.push({
      month: month_name,
      daysPresent: row[1],
      amount: row[0],
    });

    currentDate.setMonth(currentDate.getMonth() - 1);
  }
  return amountList;
}


module.exports = { getAmountList,isPresentOnDate,calculateAmount };
