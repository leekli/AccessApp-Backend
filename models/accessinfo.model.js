const mongoose = require("mongoose");

const accessSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  wheelchair: {
    type: String,
    required: true,
    default: "No",
  },
  wheelchairDesc: {
    type: String,
    required: true,
    default: "No information",
  },
});

module.exports = mongoose.model("AccessInfo", accessSchema);
