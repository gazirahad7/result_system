const mysql = require("mysql2");
require("dotenv").config();

const dbConn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  pass: process.env.DB_PASS,
});

module.exports = dbConn;
