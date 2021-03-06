// REQUIRE
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Todo = require("./models/todo.js");
// ==============================================
// CONFIG
// init express
const app = express();

// Serving static assets
app.use(express.static(path.join(__dirname, "/public")));

// EJS Mate -> for layouts
app.engine("ejs", ejsMate);

// Parsing Middlewares
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(express.json()); // JSON

// Setting up the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Override with POST having ?_method=PATCH or DELETE
app.use(methodOverride("_method"));

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

// ==============================================
// ROUTES
// get
// home page
app.get("/", async (req, res) => {
  res.redirect("/todos");
});

// get
// all todos
// index
app.get("/todos", async (req, res) => {
  const { title } = req.body;
  const todos = await Todo.find();
  var today = new Date();
  var prefs = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var dayToday = today.toLocaleString("en-US", prefs);
  res.render("todos/index", { todos, title, dayToday });
});

// post
// todo
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title: title });
  await todo.save();
  res.redirect("/todos");
});

// delete
// todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.deleteOne({ _id: id });
  res.redirect("/todos");
});

// ==============================================
// LISTEN
app.listen(5000, () => {
  console.log("Connected to Port 5000!");
});
