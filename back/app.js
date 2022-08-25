const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());

app.set("port", 3000);

app.use(express.json());

getdata = (req, res, next) => {
  console.log(req.body.name);
  res.status(200).json({ message: "yes" });
};

app.post("/api/datas", getdata);

module.exports = app;
