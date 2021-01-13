// REQUIRE
const mongoose = require("mongoose");

// SET UP SCHEMA
//==========================================
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

// SET UP MODEL
//==========================================
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
