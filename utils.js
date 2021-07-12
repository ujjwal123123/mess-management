/**
 *
 * @param {boolean} value
 */
function assert(value) {
  if (!value) {
    throw Error("Assertion error");
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

module.exports = { getProgram, assert, getYearOfAdmission };
