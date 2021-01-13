// REQUIRE
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
// ==============================================
// CONFIG
// init express
const app = express();

// Serving static assets
app.use(express.static(path.join(__dirname, "/public")));

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
  res.send("Connected!");
});

// get
// all todos
// index
app.get("/todos", async (req, res) => {
  res.render("todos/index");
});

// ==============================================
// LISTEN
app.listen(5000, () => {
  console.log("Connected to Port 5000!");
});
