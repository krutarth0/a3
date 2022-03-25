const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/storestudents", (req, res) => {
  console.log(req.body());
  res.send("students added successfully");
});

app.get("/liststudents", (req, res) => {
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
