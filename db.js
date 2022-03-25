const mysql = require("mysql");

const con = mysql.createConnection({
  host: "a3-db.copy3vmktcqp.us-east-1.rds.amazonaws.com",
  user: "B00896235",
  password: "FMCyh3UhGFAJEy8D",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.end();
});
