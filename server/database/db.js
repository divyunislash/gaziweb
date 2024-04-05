const mysql = require("mysql");

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "Devtest501@",
  database: "gazi",
  multipleStatements: true,
});

db.connect();

module.exports = db;
