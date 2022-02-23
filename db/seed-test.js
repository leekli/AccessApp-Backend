// seed-test.js - This file contains the seed data for for test database, used to perform tests on. An array of objects suitable for MongoDB.

const AccessInfo = require("../models/accessinfo.model.js");
const Users = require("../models/users.model.js");

exports.testData = [
  new AccessInfo({
    _id: 1,
    name: "Place 1",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Yes",
    wheelchairDesc: "1 ramp",
  }),
  new AccessInfo({
    _id: 2,
    name: "Place 2",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Yes",
    wheelchairDesc: "2 ramps",
  }),
  new AccessInfo({
    _id: 3,
    name: "Place 3",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "No",
  }),
  new AccessInfo({
    _id: 4,
    name: "Place 4",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Yes",
    wheelchairDesc: "No information",
  }),
  new AccessInfo({
    _id: 5,
    name: "Place 5",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Yes",
    wheelchairDesc: "1 ramp",
  }),
  new AccessInfo({
    _id: 6,
    name: "Place 6",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Yes",
    wheelchairDesc: "2 entrances",
  }),
  new AccessInfo({
    _id: 7,
    name: "Place 7",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "No",
  }),
  new AccessInfo({
    _id: 8,
    name: "Place 8",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Limited",
    wheelchairDesc: "Limited access",
  }),
  new AccessInfo({
    _id: 9,
    name: "Place 9",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Limited",
  }),
  new AccessInfo({
    _id: 10,
    name: "Place 10",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Yes",
    wheelchairDesc: "Entrance has no steps, all rooms accessible",
  }),
  new AccessInfo({
    _id: 11,
    name: "Place 11",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "No",
    wheelchairDesc: "Entrance has a high step",
  }),
  new AccessInfo({
    _id: 12,
    name: "Place 12",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Limited",
    wheelchairDesc:
      "Entrance has one step with max. 3 inches height, most rooms are without steps",
  }),
  new AccessInfo({
    _id: 13,
    name: "Place 13",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Limited",
  }),
  new AccessInfo({
    _id: 14,
    name: "Place 14",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Yes",
    wheelchairDesc: "All rooms accesible",
  }),
  new AccessInfo({
    _id: 15,
    name: "Place 15",
    lat: 53.5956275,
    lon: 9.998174,
    wheelchair: "Limited",
    wheelchairDesc:
      "Entrance is easily accessible, but there are steps half way into the building with are not accessible",
  }),
];

exports.userTestData = [
  new Users({
    username: "joe_bloggs_2022",
    first_name: "Joe",
    last_name: "Bloggs",
    city: "Manchester",
    avatar_url: "https://www.w3schools.com/howto/img_avatar.png",
    wheelchairUser: true,
  }),
];
