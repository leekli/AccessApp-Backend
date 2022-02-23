// accessinfo.controllers.js - Controllers file containing all code for various API calls made to /api/accessinfo

const AccessInfo = require("../models/accessinfo.model");

// GET Request function
exports.getAccessInfo = async (req, res, next) => {
  try {
    const allAccessInfo = await AccessInfo.find();
    res.status(200).json(allAccessInfo);
  } catch (error) {
    next(error);
  }
};

// GET by ID Request function
exports.getAccessInfoById = async (req, res, next) => {
  try {
    const returnedAccessInfo = await AccessInfo.findById(req.params.id);
    if (returnedAccessInfo === null) {
      res.status(404).json({ msg: "Not found" });
    } else {
      res.status(200).json(returnedAccessInfo);
    }
  } catch (error) {
    next(error);
  }
};

// POST Request function
exports.postAccessInfo = async (req, res, next) => {
  const newItem = new AccessInfo({
    _id: req.body._id,
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon,
    wheelchair: req.body.wheelchair,
    wheelchairDesc: req.body.wheelchairDesc,
  });

  try {
    const savedPost = await newItem.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// PATCH by Id Request function
exports.patchAccessInfoById = async (req, res, next) => {
  try {
    const returnedAccessInfo = await AccessInfo.findById(req.params.id);
    if (returnedAccessInfo === null) {
      res.status(404).json({ msg: "Not found" });
    } else {
      const updatedItem = await AccessInfo.updateOne(
        { _id: req.params.id },
        {
          $set: {
            wheelchair: req.body.wheelchair,
            wheelchairDesc: req.body.wheelchairDesc,
          },
        }
      );
      res.status(200).json(updatedItem);
    }
  } catch (error) {
    next(error);
  }
};

// DELETE by Id Request function
exports.deleteAccessInfoById = async (req, res, next) => {
  try {
    const returnedAccessInfo = await AccessInfo.findById(req.params.id);
    if (returnedAccessInfo === null) {
      res.status(404).json({ msg: "Not found" });
    } else {
      const removedItem = await AccessInfo.deleteOne({ _id: req.params.id });
      res.status(204).json(removedItem);
    }
  } catch (error) {
    next(error);
  }
};
