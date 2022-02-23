// users.controllers.js - Controllers file containing all code for various API calls made to /api/users

const Users = require("../models/users.model.js");

// GET Request function
exports.getUsers = async (req, res, next) => {
  try {
    const allUserInfo = await Users.find();
    res.status(200).json(allUserInfo);
  } catch (error) {
    next(error);
  }
};

// GET by ID Request function
exports.getUserById = async (req, res, next) => {
  try {
    const returnedUserInfo = await Users.findById(req.params.id);
    if (returnedUserInfo === null) {
      res.status(404).json({ msg: "Not found" });
    } else {
      res.status(200).json(returnedUserInfo);
    }
  } catch (error) {
    next(error);
  }
};
