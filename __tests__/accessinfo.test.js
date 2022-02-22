const { MongoClient } = require("mongodb");
const AccessInfo = require("../models/accessinfo.model.js");
const { testData } = require("../db/seed.js");
require("dotenv/config");
const request = require("supertest");

describe("AccessApp Tests", () => {
  let connection;
  let db;

  beforeAll(async () => {
    // DB Connection set up
    connection = await MongoClient.connect(process.env.DB_CONNECTION_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // DB Connection create
    db = await connection.db();

    // Delete all entries before seeding
    const testCollection = db.collection("AccessApp-DB-Test");
    await testCollection.deleteMany({});

    // Seeding
    await testCollection.insertMany(testData);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("GET - Test to check and return all documents in the database", async () => {
    const testCollection = db.collection("AccessApp-DB-Test");
    const allInfo = await testCollection.find().toArray();
    expect(allInfo).toBeInstanceOf(Array);
    expect(allInfo.length).toBeGreaterThan(0);
    expect(allInfo).toHaveLength(15);
    allInfo.forEach((eachItem) => {
      expect(eachItem).toMatchObject({
        _id: expect.any(Number),
        name: expect.any(String),
        wheelchair: expect.any(String),
      });
    });
  });

  it("GET By ID - Test to check and returned a specified document from the database", async () => {
    const testCollection = db.collection("AccessApp-DB-Test");
    const specificInfo = await testCollection.findOne({ _id: 1 });

    expect(specificInfo).toBeInstanceOf(Object);
    expect(Object.keys(specificInfo).length).toBeGreaterThan(0);
    expect(Object.keys(specificInfo)).toHaveLength(4);
    expect(specificInfo).toMatchObject({
      _id: expect.any(Number),
      name: expect.any(String),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
    });
    expect(specificInfo).toMatchObject({
      _id: 1,
      name: "Place 1",
      wheelchair: "Yes",
      wheelchairDesc: "1 ramp",
    });
  });

  it("PATCH - Test to check updates to posts/documents are submitted correctly to the database", async () => {
    const testCollection = db.collection("AccessApp-DB-Test");

    await testCollection.update(
      { _id: 13 },
      { $set: { wheelchairDesc: "decent but not amazing" } }
    );

    const updatedPost = await testCollection.findOne({ _id: 13 });
    expect(updatedPost).toMatchObject({
      _id: 13,
      wheelchairDesc: "decent but not amazing",
    });
  });
  it("DELETE - Test to check that a post/document is deleted using it's _id", async () => {
    const testCollection = db.collection("AccessApp-DB-Test");

    await testCollection.deleteOne({ _id: 15 });

    const deletedPost = await testCollection.findOne({ _id: 15 });
    expect(deletedPost).toEqual(null);
  });
});
