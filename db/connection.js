// connection.js - Deals with the mongoose connection to a defined URL using dotenv/env-cmd

const mongoose = require("mongoose");
const AccessInfo = require("../models/accessinfo.model.js");
const Users = require("../models/users.model.js");
const { devData, userDevData } = require("../db/seed-development.js");
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
      await AccessInfo.deleteMany({});
      await AccessInfo.insertMany(devData);
      await Users.deleteMany({});
      await Users.insertMany(userDevData);
      console.log("Development database is now seeded.");
    }
  );
} else if (process.env.NODE_ENV === "production") {
  mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    async () => {
      console.log("Now connected to the DEVELOPMENT database...");
      await AccessInfo.deleteMany({});
      await AccessInfo.insertMany(devData);
      await Users.deleteMany({});
      await Users.insertMany(userDevData);
      console.log("Development database is now seeded.");
    }
  );
}
