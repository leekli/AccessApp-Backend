// accessinfo.router.js - Router which deals with all requests to /api/accessinfo

const express = require("express");
const {
  getAccessInfo,
  postAccessInfo,
  getAccessInfoById,
  deleteAccessInfoById,
  patchAccessInfoById,
} = require("../controllers/accessinfo.controller");

// Initalise Router
const accessInfoRouter = express.Router();

// GET requests
accessInfoRouter.get("/", getAccessInfo);
accessInfoRouter.get("/:id", getAccessInfoById);

// POST requests
accessInfoRouter.post("/", postAccessInfo);

// PATCH requests
accessInfoRouter.patch("/:id", patchAccessInfoById);

// DELETE requests
accessInfoRouter.delete("/:id", deleteAccessInfoById);

module.exports = accessInfoRouter;
