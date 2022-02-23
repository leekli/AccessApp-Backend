// api.router.js - Main router which deals with all requests to /api and incorporates all subsequent routers which follow /api/...

const express = require("express");
const accessInfoRouter = require("./accessinfo.router");
const usersRouter = require("./users.router");

// Initalise Router
const apiRouter = express.Router();

// GET request to /api
apiRouter.get("/", (req, res) => {
  res.send("This is the home page");
});

// AccessInfo router
apiRouter.use("/accessinfo", accessInfoRouter);

// Users router
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
