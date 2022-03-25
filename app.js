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
  if (data) {
    console.log("inside con===>", data.host, data.username, data.password);
    con = mysql.createConnection({
      host: data.host,
      user: data.username,
      password: data.password,
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
      con.end();
    });
  } else {
    console.log("Missing a parameter");
  }
  // console.log(...students);
  res.send("students added successfully");
});

app.get("/liststudents", (req, res) => {
  con.connect(function (err) {
    con.query(`SELECT * FROM a3data.students`, function (err, result, fields) {
      if (err) res.send(err);
      if (result) res.send(result);
    });

    con.end();
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
