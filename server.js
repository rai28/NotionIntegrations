require("dotenv").config();
const express = require("express");

const app = express();
const notionClient = require("./notionClient");
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("It WOrks");
});

app.listen(PORT);
