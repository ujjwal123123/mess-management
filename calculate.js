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
  let daysPresent = 0; // number of days the student was present in the hostel

  let itr_date = start_date;
  while (itr_date < end_date) {
    if (await isPresentOnDate(itr_date, roll_no)) {
      amount += await rateOnDate(itr_date);
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

  let startDate = new Date(semesters[0].start_date);
  let currentDate = new Date();
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
    amountList.push({
      month: Start,
      daysPresent: row[1],
      amount: row[0],
    });

    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return amountList;
}

module.exports = { getAmountList };
