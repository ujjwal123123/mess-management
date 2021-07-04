const database = require("./database");

async function rateOnDate(date) {
  const rateTable = await database("Rate")
    .where("start_date", "<=", date)
    .orderBy("start_date");

  console.log(rateTable);
}

// function isPresentOnDate(date) {}

rateOnDate("2022-01-03");
