const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  Text: { type: String, default: null },
  isCompleted: { type: String, default: null },
  userId: { type: String, default: null },
});

module.exports = mongoose.model("todo", TodoSchema);
