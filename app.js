const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const snackController = require("./controllers/snackController");

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// SNACKS ROUTE
app.use("/snacks", snackController);

//ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Snack app");
});

app.get("/*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = app;
