const database = require("./database");

function assert(value) {
  if (!value) {
    throw Error("Assertion error");
  }
}

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
 * @param {number} roll_no
 * @returns {string}
 */
function getProgram(roll_no) {
  assert(roll_no.toString().length == 7);
  const programCode = parseInt(roll_no.toString().substring(2, 4));
  switch (programCode) {
    case 1:
      return "btech";
    case 2:
      return "mtech";
    case 3:
      return "phd";
    default:
      throw Error("Invalid roll no");
  }
}

/**
 *
 * @param {Number} roll_no
 * @returns {Number}
 */
function getYearOfAdmission(roll_no) {
  assert(roll_no.toString().length == 7);
  return parseInt(roll_no.toString().substring(0, 2)) + 2000;
}

/**
 *
 * @param {Date} date
 * @param {number} roll_no
 * @returns {Promise<boolean>}
 */
async function isPresentOnDate(date, roll_no) {
  assert(roll_no.toString().length == 7);
  const yearOfAdmission = getYearOfAdmission(roll_no);
  const program = getProgram(roll_no);

  const semesterTable = await database("Semesters")
    .where("start_date", "<=", date)
    .where("end_date", ">", date)
    .where("program", program)
    .where("year_of_admission", yearOfAdmission);

  assert(semesterTable.length == 1 || semesterTable.length == 0);
  let isPresent = semesterTable.length === 1;

  const leavesTable = await database("Leaves")
    .where("start_date", "<=", date)
    .where("end_date", ">", date)
    .where("roll_no", roll_no);

  assert(leavesTable.length == 1 || leavesTable.length == 0);
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
  assert(start_date < end_date);

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
