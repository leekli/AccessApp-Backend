const express = require("express");
const accessInfoRouter = require("./accessinfo.router");

// Initalise Router
const apiRouter = express.Router();

// GET request to /api
apiRouter.get("/", (req, res) => {
  res.send("This is the home page");
});

// AccessInfo router
apiRouter.use("/accessinfo", accessInfoRouter);

module.exports = apiRouter;
