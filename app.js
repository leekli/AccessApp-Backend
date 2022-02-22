const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
const apiRouter = require("./routes/api.router.js");

// Initalise server
const app = express();

// Initalise middleware (CORS & JSON)
app.use(cors());
app.use(express.json());

// Router Endpoints
app.use("/api", apiRouter);

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Now connected to the database...")
);

module.exports = app;
