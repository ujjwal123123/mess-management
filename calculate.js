const database = require("./database");

function assert(value) {
  if (!value) {
    throw Error("Assertion error");
  }
}

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

function getProgram(roll_no) {
  assert(roll_no.length == 7);
  const programCode = parseInt(roll_no.substring(2, 4));
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

function getYearOfAdmission(roll_no) {
  assert(roll_no.length == 7);
  return parseInt(roll_no.substring(0, 2)) + 2000;
}

async function isPresentOnDate(date, roll_no) {
  assert(roll_no);
  const yearOfAdmission = getYearOfAdmission(roll_no);
  const program = getProgram(roll_no);

  const semesterTable = await database("Semesters")
    .where("start_date", "<=", date)
    .where("end_date", ">=", date)
    .where("program", program)
    .where("year_of_admission", yearOfAdmission);

  assert(semesterTable.length == 1 || semesterTable.length == 0);
  let isPresent = semesterTable.length === 1;

  const leavesTable = await database("Leaves")
    .where("start_date", "<=", date)
    .where("end_date", ">=", date)
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

