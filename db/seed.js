const AccessInfo = require("../models/accessinfo.model.js");

exports.testData = [
  new AccessInfo({
    _id: 1,
    name: "Place 1",
    wheelchair: "Yes",
    wheelchairDesc: "1 ramp",
  }),
  new AccessInfo({
    _id: 2,
    name: "Place 2",
    wheelchair: "Yes",
    wheelchairDesc: "2 ramps",
  }),
  new AccessInfo({
    _id: 3,
    name: "Place 3",
    wheelchair: "No",
  }),
  new AccessInfo({
    _id: 4,
    name: "Place 4",
    wheelchair: "Yes",
    wheelchairDesc: "No information",
  }),
  new AccessInfo({
    _id: 5,
    name: "Place 5",
    wheelchair: "Yes",
    wheelchairDesc: "1 ramp",
  }),
  new AccessInfo({
    _id: 6,
    name: "Place 6",
    wheelchair: "Yes",
    wheelchairDesc: "2 entrances",
  }),
  new AccessInfo({
    _id: 7,
    name: "Place 7",
    wheelchair: "No",
  }),
  new AccessInfo({
    _id: 8,
    name: "Place 8",
    wheelchair: "Limited",
    wheelchairDesc: "Limited access",
  }),
  new AccessInfo({
    _id: 9,
    name: "Place 9",
    wheelchair: "Limited",
  }),
  new AccessInfo({
    _id: 10,
    name: "Place 10",
    wheelchair: "Yes",
    wheelchairDesc: "Entrance has no steps, all rooms accessible",
  }),
  new AccessInfo({
    _id: 11,
    name: "Place 11",
    wheelchair: "No",
    wheelchairDesc: "Entrance has a high step",
  }),
  new AccessInfo({
    _id: 12,
    name: "Place 12",
    wheelchair: "Limited",
    wheelchairDesc:
      "Entrance has one step with max. 3 inches height, most rooms are without steps",
  }),
  new AccessInfo({
    _id: 13,
    name: "Place 13",
    wheelchair: "Limited",
  }),
  new AccessInfo({
    _id: 14,
    name: "Place 14",
    wheelchair: "Yes",
    wheelchairDesc: "All rooms accesible",
  }),
  new AccessInfo({
    _id: 15,
    name: "Place 15",
    wheelchair: "Limited",
    wheelchairDesc:
      "Entrance is easily accessible, but there are steps half way into the building with are not accessible",
  }),
];
