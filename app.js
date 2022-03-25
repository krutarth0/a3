const express = require("express");
const mysql = require("mysql");
const dbcon = require("./db.js");

const app = express();
const port = 3000;

const con = mysql.createConnection({
  host: "a3-db.copy3vmktcqp.us-east-1.rds.amazonaws.com",
  user: "B00896235",
  password: "FMCyh3UhGFAJEy8D",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/storestudents", (req, res) => {
  const students = req.body.students;
  if (req.query.students) {
    console.log("Request received, working on it");
    con.connect(function (err) {
      students.forEach((element) =>
        con.query(
          `INSERT INTO a3data.students (first_name, last_name, banner) VALUES ('${element.first_name}', '${element.last_name}', '${element.banner}')`,
          function (err, result, fields) {
            if (err) res.send(err);
            if (result) if (fields) console.log(fields);
          }
        )
      );
    });
  } else {
    console.log("Missing a parameter");
  }
  console.log(...students);
  res.send("students added successfully");
});

app.get("/liststudents", (req, res) => {
  con.connect(function (err) {
    con.query(`SELECT * FROM a3data.students`, function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });
  });

  // const students = [
  //   {
  //     first_name: "rob",
  //     last_name: "robbie",
  //     banner: "dummybanner",
  //   },
  //   {
  //     first_name: "rob2",
  //     last_name: "robbie2",
  //     banner: "dummybanner2",
  //   },
  // ];
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
