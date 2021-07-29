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
async function isPresentOnDateInHostel(date, roll_no) {
  // utils.assert(roll_no.toString().length == 7);//TODO
  const yearOfAdmission = utils.getYearOfAdmission(roll_no);
  const program = utils.getProgram(roll_no);

  const semesterTable = await database("Semesters")
    .where("start_date", "<=", date)
    .where("end_date", ">=", date)
    .where("program", program)
    .where("year_of_admission", yearOfAdmission);

  // utils.assert(semesterTable.length == 1 || semesterTable.length == 0);//TODO
  // let isPresent = semesterTable.length === 1;

  const leavesTable = await database("Leaves")
    .where("start_date", "<=", date)
    .where("end_date", ">=", date)
    .where("roll_no", roll_no);

  // utils.assert(leavesTable.length == 1 || leavesTable.length == 0);//TODO
  if (leavesTable.length == 0 && semesterTable.length == 0) {
    return false;
  }
   if(leavesTable.length != 0 && semesterTable.length == 0){
    return true;
  }
  else if(leavesTable.length == 0 && semesterTable.length == 1){
    return true;
  }
  else if(leavesTable.length != 0 && semesterTable.length == 1){
    return false;
  }
  return true;
}

/**
 *
 * @param {Date} start_date
 * @param {Date} end_date
 * @param {number} roll_no
 * @returns {Promise<number>}
 */
async function calculateAmount(start, end, roll_no) {
  const start_date = new Date(start);
  const end_date = new Date(end);
  // utils.assert(start_date < end_date);//TODO

    let remark="";
    let amount = 0;
    let noOfDaysCount = 0;
    let lastRate = -1;

  const leaves = await database("Leaves")
    .select()
    .where("roll_no", "=", roll_no)
    .where("start_date", ">=", start_date)
    .where("start_date", "<",end_date)
  if(leaves.length==0)
    remark = "NIL";
  for (let i = 0; i < leaves.length; i++) {
   remark += (i+1)+') '+leaves[i].remark+"\n";
  }

  var itr_date = start_date;
  while (itr_date <= end_date) {
    if (await isPresentOnDateInHostel(itr_date, roll_no)) {
      let currRate = await rateOnDate(itr_date)
      amount += currRate;
      noOfDaysCount++;
      if(currRate > lastRate)
        lastRate = currRate;
    }
    itr_date.setDate(itr_date.getDate() + 1);
  }

  console.log(`amount is ${amount}`);
  console.log(remark);
  return [amount,remark,noOfDaysCount,lastRate];
}

async function getAmountList(roll_no) {
  const program = utils.getProgram(roll_no);
  const year_of_admission = utils.getYearOfAdmission(roll_no);
  let amountList = []

  const semesters = await database("Semesters")
    .select()
    .where("year_of_admission", year_of_admission)
    .where("program", program);

  let startDate = new Date(semesters[0].start_date);
  let currentDate = new Date();
  let SerialNo = 1;
  while(currentDate >= startDate){
    const Start = currentDate.getFullYear().toString()+'-'+(currentDate.getMonth()+1).toString()+'-01';
    const End = currentDate.getFullYear().toString()+'-'+(currentDate.getMonth()+1).toString()+'-'+(new Date(currentDate.getFullYear(), currentDate.getMonth() +1, 0).getDate()).toString();

    const List = await calculateAmount(Start,End,roll_no);
    amountList.push({serialNo:SerialNo, from:Start, to:End, noOfDays:List[2], rate:List[3], amount:List[0], remark:List[1]});

    SerialNo++;
    currentDate.setMonth(currentDate.getMonth()-1);
  }

  return amountList;
}

module.exports = {getAmountList};
