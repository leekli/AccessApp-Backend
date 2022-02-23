// users.router.js - Router which deals with all requests to /api/users

const express = require("express");
const { getUsers, getUserById } = require("../controllers/users.controller");

// Initalise Router
const usersRouter = express.Router();

// GET requests
usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);

module.exports = usersRouter;
