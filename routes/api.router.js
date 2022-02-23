// api.router.js - Main router which deals with all requests to /api and incorporates all subsequent routers which follow /api/...

const express = require("express");
const accessInfoRouter = require("./accessinfo.router");
const usersRouter = require("./users.router");
const fs = require("fs/promises");

// Initalise Router
const apiRouter = express.Router();

// GET request to /api - Returns an endpoints.json file
apiRouter.get("/", (req, res, next) => {
  return fs
    .readFile("./endpoints.json", "utf8")
    .then((data) => {
      const endpoints = JSON.parse(data);
      return endpoints;
    })
    .then((allEndPoints) => {
      res.status(200).send({ allEndPoints });
    })
    .catch((err) => {
      next(err);
    });
});

// AccessInfo router
apiRouter.use("/accessinfo", accessInfoRouter);

// Users router
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
