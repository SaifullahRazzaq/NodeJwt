require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const app = express();
const bcrypt = require("bcryptjs");
const { emailRegexp } = require("./validate");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifyToken");
const user = require("./model/user");
app.use(express.json());

app.use("/api/v1/user", require('./Api/Auth'));
app.use('/api/v1/todo',require('./Api/Todo'))

//create Todos

// app.post("/createTodos", (req, res) => {
//   const { Text } = req.body;
//   if (!Text) {
//     res.status(400).send({ message: "Enter a Text" });
//   } else if (verifyToken) {
//   }
// });
module.exports = app;
