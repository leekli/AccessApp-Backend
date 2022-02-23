// connection.js - Deals with the mongoose connection to a defined URL using dotenv/env-cmd

const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () =>
  console.log("Now connected to the database...")
);
