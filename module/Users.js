const mongoose = require("mongoose");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  name: String,
  userName: String,
  password: String,
});

const url = process.env.DB_Users_URL;
const conn = mongoose.createConnection(url);
module.exports = conn.model("User", UserSchema);
