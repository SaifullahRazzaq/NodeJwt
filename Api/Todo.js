const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/verifyToken");
const Todo = require("../model/Todo");
const getUser = require("../middleware/getCurrentUser");
app.use(express.json());

//create todo
app.post("/createTodo", verifyToken, async (req, res) => {
  const { Text } = req.body;
  if (!Text) {
    res.status(400).send({ message: "Please Enter Text To Create Todo List" });
  } else {
    const cretedTodo = await Todo.create({
      Text: Text,
      userId: req?.body?.id,
      //   isCompleted:req?.body?.b
    });
    res.send({
      message: "Success",
      data: res.status(200).json({ data: cretedTodo }),
    });
  }
});
//get Single TodoById,
app.get("/getTodoById/:id", verifyToken, async (req, res) => {
  console.log("req===>", req?.params);
  try {
    const allTodo = await Todo.findOne({ _id: req?.params?.id });
    res.send({
      message: "Get Data Successfully",
      data: res.status(200).json({ data: allTodo }),
    });
  } catch (error) {}
});

app.get("/getAllTodo", verifyToken, async (req, res) => {
  try {
    const allTodo = await Todo.find();
    res.send({
      message: "Get Data Successfully",
      data: res.status(200).json({ data: allTodo }),
    });
  } catch (error) {}
});

//update todo
app.post("/updateTodo", verifyToken, async (req, res) => {
  try {
    const { todoId, Text, userID } = req.body;
    // console.log("check--->", req?.body);
    const TodoData = await Todo.findById(todoId, {
      Text: Text,
      userId: userID,
    });
    console.log("??????",TodoData)
    if (!TodoData) {
        cons
        return res.status(400).send({ message: "No Record Found" });
    } else {
      TodoData.save();
     return  res.send({
        message: "Todo Updated Successfully",
        data: res.status(200).json({ data: TodoData }),
      });
    }
  } catch (error) {
    return res.status(404).send({ message: error});
  }
});

//getAllTodoByUserId
app.get("/getTodoByUserId/:id", verifyToken, async (req, res) => {
  //   console.log("req===>", req?.params);
  try {
    const allTodo = await Todo.find({ userId: req?.params?.id });
    res.send({
      message: "Get Data Successfully",
      data: res.status(200).json({ data: allTodo }),
    });
  } catch (error) {}
});

module.exports = app;
