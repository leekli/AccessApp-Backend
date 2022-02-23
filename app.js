// app.js - Code to create an express server, incorporting middleware and the main /api route/router

require("./db/connection.js");
const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api.router.js");

// Initalise server
const app = express();

// Initalise middleware (CORS & JSON)
app.use(cors());
app.use(express.json());

// Router Endpoints
app.use("/api", apiRouter);

module.exports = app;
