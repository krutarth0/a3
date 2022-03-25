const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

var AWS = require("aws-sdk"),
  region = "us-east-1",
  secretName =
    "arn:aws:secretsmanager:us-east-1:443785020005:secret:a3-RDS-secrets-2oW8ko",
  secret,
  decodedBinarySecret;

const app = express();
const port = 3000;

var client = new AWS.SecretsManager({
  region: region,
});
const secretString = new Promise((resolve, reject) => {
  client.getSecretValue({ SecretId: secretName }, function (err, data) {
    if (err) {
      console.log(err);
      reject(err);
      throw err;
    } else {
      if ("SecretString" in data) {
        // console.log(data.SecretString);
        resolve(data.SecretString);

        // console.log(secret);
      }
    }
  });
});

var ThisSecret = async (promise) => {
  const data = await promise;
  return data;
};

var con;
ThisSecret(secretString).then((data) => {
  const secret = JSON.parse(data);
  if (data) {
    con = mysql.createConnection({
      host: secret.host,
      user: secret.username,
      password: secret.password,
    });
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/storestudents", (req, res) => {
  const students = req.body.students;
  // console.log(req.body);
  if (students) {
    console.log("Request received, working on it");
    students.forEach((element) =>
      con.query(
        `INSERT INTO a3data.students (first_name, last_name, banner) VALUES ('${element.first_name}', '${element.last_name}', '${element.banner}')`,
        function (err, result, fields) {
          if (err) res.send(err);
          if (result) if (fields) console.log(fields);
        }
      )
    );
  } else {
    console.log("Missing a parameter");
  }
  // console.log(...students);
  res.send("students added successfully");
});

app.get("/liststudents", (req, res) => {
  con.query(`SELECT * FROM a3data.students`, function (err, result, fields) {
    if (err) console.log(err);
    if (result) res.send(result);
  });
});

app.get("/clear", (req, res) => {
  con.query("TRUNCATE TABLE a3data.students");
  res.send("Table cleared");
});

app.get("/create", (req, res) => {
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS a3data;");
  con.query("USE a3data;");
  con.query(
    "CREATE TABLE IF NOT EXISTS students(id int NOT NULL AUTO_INCREMENT, first_name varchar(100), last_name varchar(100), banner varchar(20), PRIMARY KEY(id));",
    function (error, result, fields) {
      console.log(result);
    }
  );
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
