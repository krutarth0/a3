const mysql = require("mysql");

const con = mysql.createConnection({
  host: "a3-db.copy3vmktcqp.us-east-1.rds.amazonaws.com",
  user: "B00896235",
  password: "FMCyh3UhGFAJEy8D",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("CREATE DATABASE IF NOT EXISTS a3data;");
  con.query("USE a3data;");
  con.query(
    "CREATE TABLE IF NOT EXISTS students(id int NOT NULL AUTO_INCREMENT, first_name varchar(100), last_name varchar(100), banner varchar(20), PRIMARY KEY(id));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  con.end();
});
