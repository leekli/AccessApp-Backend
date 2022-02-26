// connection.js - Deals with the mongoose connection to a defined URL using dotenv/env-cmd

const mongoose = require("mongoose");
const AccessInfo = require("../models/accessinfo.model.js");
const Users = require("../models/users.model.js");
const { devData, userDevData } = require("../db/seed-development.js");
const manchesterData = require("./manchesterBigData.json");
require("dotenv/config");

if (process.env.NODE_ENV === "test") {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => {
    console.log("Now connected to the TEST database...");
  });
} else if (process.env.NODE_ENV === "development") {
  mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    async () => {
      console.log("Now connected to the DEVELOPMENT database...");

      await Users.deleteMany({});
      await Users.insertMany(userDevData);
      await AccessInfo.deleteMany({});

      let keyArray = manchesterData.features;
      keyArray.forEach((element) => {
        AccessInfo.create({
          _id: element.id.match(/[0-9]+/g).join(""),
          osm_type: element.properties["@id"].match(/[a-zA-Z]+/g).join(""),
          name: element.properties["name"],
          lat: element.geometry.coordinates,
          accessibility_ratings: [],
          comments: [],
        });
      });

      console.log("Development database is now seeded.");
    }
  );
} else if (process.env.NODE_ENV === "production") {
  mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    async () => {
      console.log("Now connected to the PRODUCTION database...");

      await Users.deleteMany({});
      await Users.insertMany(userDevData);
      await AccessInfo.collection.drop();
      await AccessInfo.deleteMany({});

      let keyArray = manchesterData.features;
      keyArray.forEach((element) => {
        AccessInfo.create({
          _id: element.id.match(/[0-9]+/g).join(""),
          osm_type: element.properties["@id"].match(/[a-zA-Z]+/g).join(""),
          name: element.properties["name"],
          lat: element.geometry.coordinates,
          accessibility_ratings: [],
          comments: [],
        });
      });

      console.log("Production database is now seeded.");
    }
  );
}
