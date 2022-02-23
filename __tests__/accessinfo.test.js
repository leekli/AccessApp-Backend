// accessinfo.test.js - Test file for all API requests to /api/accessinfo

const request = require("supertest");
const app = require("../app.js");
const AccessInfo = require("../models/accessinfo.model.js");
const { testData } = require("../db/seed.js");
const mongoose = require("mongoose");

// Before starting tests - clear out the existing test data, and re-seed with fresh and reset test data
beforeAll(async () => {
  await AccessInfo.deleteMany({});
  await AccessInfo.insertMany(testData);
});

// After all tests ends, disconnect the mongoose connection
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Basic tests - GET/POST/PATCH/DELETE:", () => {
  it("GET /api/accessinfo - Test to check and return all documents in the database", async () => {
    const allInfo = await request(app).get("/api/accessinfo").expect(200);
    expect(allInfo.body).toBeInstanceOf(Array);
    expect(allInfo.body.length).toBeGreaterThan(0);
    expect(allInfo.body).toHaveLength(15);
    allInfo.body.forEach((eachItem) => {
      expect(eachItem).toMatchObject({
        _id: expect.any(Number),
        name: expect.any(String),
        wheelchair: expect.any(String),
      });
    });
  });

  it("GET By ID /api/accessinfo/:id - Test to check and returned a specified document from the database", async () => {
    const specificInfo = await request(app)
      .get("/api/accessinfo/1")
      .expect(200);
    expect(specificInfo.body).toBeInstanceOf(Object);
    expect(Object.keys(specificInfo.body)).toHaveLength(5);
    expect(specificInfo.body).toMatchObject({
      _id: expect.any(Number),
      name: expect.any(String),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
    });
    expect(specificInfo.body).toMatchObject({
      _id: 1,
      name: "Place 1",
      wheelchair: "Yes",
      wheelchairDesc: "1 ramp",
    });
  });

  it("POST /api/accessinfo - Test to check that a new post/document is submitted correctly to the database", async () => {
    const newItem = await request(app)
      .post("/api/accessinfo")
      .send({
        _id: 16,
        name: "Place 16",
        wheelchair: "Yes",
        wheelchairDesc: "ABC",
      })
      .expect(201);
    const getNewItem = await request(app).get("/api/accessinfo/16").expect(200);
    expect(newItem).not.toBe(getNewItem.body);
    expect(getNewItem.body).toBeInstanceOf(Object);
    expect(getNewItem.body).toMatchObject({
      _id: expect.any(Number),
      name: expect.any(String),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
    });
    expect(getNewItem.body).toMatchObject({
      _id: 16,
      name: "Place 16",
      wheelchair: "Yes",
      wheelchairDesc: "ABC",
    });
  });

  it("PATCH /api/accessinfo/:id - Test to check updates to posts/documents are submitted correctly to the database", async () => {
    const updatedElements = {
      wheelchairDesc: "decent but not amazing",
    };

    const updatedItem = await request(app)
      .patch("/api/accessinfo/13")
      .send(updatedElements)
      .expect(200);
    const getUpdatedItem = await request(app)
      .get("/api/accessinfo/13")
      .expect(200);
    expect(Object.keys(getUpdatedItem.body)).toHaveLength(5);
    expect(getUpdatedItem.body).toMatchObject({
      _id: expect.any(Number),
      name: expect.any(String),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
    });
    expect(getUpdatedItem.body).toMatchObject({
      _id: 13,
      wheelchairDesc: "decent but not amazing",
    });
  });

  it("DELETE /api/accessinfo/:id - Test to check that a post/document is deleted using it's _id", async () => {
    const deletedInfo = await request(app)
      .delete("/api/accessinfo/15")
      .expect(204);
    const getDeletedItem = await request(app).get("/api/accessinfo/15");
    expect(getDeletedItem.body).toEqual(null);
  });
});
