const mongoose = require("mongoose");
require("dotenv").config();

const TodosSchema = mongoose.Schema({
  todo: String,
  status: String,
  priority: String,
});

const url = process.env.DB_Todos_URL;
const conn = mongoose.createConnection(url);
module.exports = conn.model("Todos", TodosSchema);
