const express = require("express");
const app = express();
const port = 3000;

const dbcon = require("db.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/storestudents", (req, res) => {
  console.log(req.body());
  res.send("students added successfully");
});

app.get("/liststudents", (req, res) => {
  dbcon.connect(function (err) {
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

  const students = [
    {
      first_name: "rob",
      last_name: "robbie",
      banner: "dummybanner",
    },
    {
      first_name: "rob2",
      last_name: "robbie2",
      banner: "dummybanner2",
    },
  ];

  res.send(students);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
