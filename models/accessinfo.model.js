// accessinfo.model.js - The MongoDB Schema for 'AccessInfo' collection

const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  author: String,
  body: {
    type: String,
    required: true,
  },
  commentDate: {
    type: Date,
    default: Date.now,
  },
  total_confirmed_votes: {
    type: Number,
  },
});

const accessSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  osm_type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
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
  accessibility_ratings: [Number],
  comments: [commentsSchema],
});

module.exports = mongoose.model("AccessInfo", accessSchema);
