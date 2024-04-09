const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  host: "127.0.0.1",
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NM,
  multipleStatements: true,
});

db.connect();

module.exports = db;
