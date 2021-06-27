require("dotenv").config();

const knex = require("knex");

const pool = knex.knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    debug: process.env.NODE_ENV === "development",
    timezone: "IST",
    dateStrings: true,
  },
});

module.exports = pool;
