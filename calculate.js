const database = require("./database");
const utils = require("./utils");

/**
 *
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
 *
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
    .where("end_date", ">", date)
    .where("program", program)
    .where("year_of_admission", yearOfAdmission);

  utils.assert(semesterTable.length == 1 || semesterTable.length == 0);
  let isPresent = semesterTable.length === 1;

  const leavesTable = await database("Leaves")
    .where("start_date", "<=", date)
    .where("end_date", ">", date)
    .where("roll_no", roll_no);

  utils.assert(leavesTable.length == 1 || leavesTable.length == 0);
  if (leavesTable.length === 0 && semesterTable.length === 0) {
    return false;
  }
  if (leavesTable.length === 1) {
    isPresent = !isPresent;
  }

  return isPresent;
}

/**
 *
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {number} roll_no
 * @returns {Promise<number>}
 */
async function calculateAmount(start_date, end_date, roll_no) {
  utils.assert(start_date < end_date);

  let amount = 0;
  var itr_date = start_date;
  while (itr_date < end_date) {
    if (await isPresentOnDate(itr_date, roll_no)) {
      amount += await rateOnDate(itr_date);
    }
    itr_date.setDate(itr_date.getDate() + 1);
  }

  console.log(`amount is ${amount}`);
  return amount;
}

async function getAmountList(roll_no) {
  const program = utils.getProgram(roll_no);
  const year_of_admission = utils.getYearOfAdmission(roll_no);

  const semesters = await database("Semesters")
    .select()
    .where("year_of_admission", year_of_admission)
    .where("program", program);

  const leaves = await database("Leaves").select();
}
