// users.model.js - The MongoDB Schema for 'Users' collection

const mongoose = require("mongoose");
require("mongoose-type-url");

const usersSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    default: "Not set",
  },
  avatar_url: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    default: "https://www.w3schools.com/howto/img_avatar.png",
  },
  wheelchairUser: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Users", usersSchema);
