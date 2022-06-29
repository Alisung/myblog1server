const fs = require("fs");

const data = fs.readFileSync("./database1.json");
const conf = JSON.parse(data);
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: conf.host,
  port: conf.port,
  user: conf.user,
  password: conf.password,
  database: conf.database,
});

connection.connect();

module.exports = connection;

// db.query("SELECT * FROM postlist", function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(results);
// });
// db.end();
