// seed-development.js - This file contains the seed data for for development database. An array of objects suitable for MongoDB.

const AccessInfo = require("../models/accessinfo.model.js");
const Users = require("../models/users.model.js");

exports.devData = [
  new AccessInfo({
    _id: 127787980,
    name: "The Tiger",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "No",
    wheelchairDesc: "No information",
  }),
];

exports.userDevData = [
  new Users({
    username: "joe_bloggs_2022",
    first_name: "Joe",
    last_name: "Bloggs",
    city: "Manchester",
    avatar_url: "https://www.w3schools.com/howto/img_avatar.png",
    wheelchairUser: true,
  }),
];
