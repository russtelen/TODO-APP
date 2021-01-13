// REQUIRE
const mongoose = require("mongoose");
const Todo = require("./models/todo.js");

// CONFIG
// Connect Mongoose
mongoose
  .connect("mongodb://localhost:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTED!");
  })
  .catch((e) => {
    console.log("MONGO CONNECTION ERROR :(");
    console.log(e);
  });

const seedTodos = [
  {
    title: "Buy Milk",
  },
  {
    title: "Work Out",
  },
  {
    title: "Code All Night",
  },
];

Todo.insertMany(seedTodos)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
