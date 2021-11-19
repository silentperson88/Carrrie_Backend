const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const usersManagement = require("./ModuleManagement/Users");
const todosManagement = require("./ModuleManagement/Todos");

const app = express();
app.use(cors());

// const url = process.env.DB_URL;

app.get("/", (req, res) => {
  res.send(`lets build an api`);
});
app.use(express.json());
app.use("/todosManagement", todosManagement);
app.use("/usersManagement", usersManagement);
app.listen(process.env.PORT || 9000);
