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
  it("GET /api/accessinfo - Status 200: Test to check and return all documents in the database", async () => {
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

  it("GET By ID /api/accessinfo/:id - Status 200: Test to check and returned a specified document from the database", async () => {
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

  it("POST /api/accessinfo - Status 201: Test to check that a new post/document is submitted correctly to the database", async () => {
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

  it("POST /api/accessinfo - Status 201: Test to check that a new post/document is submitted correctly to the database, tests that 2 fields default to schema settings if missing", async () => {
    const newItem = await request(app)
      .post("/api/accessinfo")
      .send({
        _id: 17,
        name: "Place 17",
      })
      .expect(201);
    const getNewItem = await request(app).get("/api/accessinfo/17").expect(200);
    expect(newItem).not.toBe(getNewItem.body);
    expect(getNewItem.body).toBeInstanceOf(Object);
    expect(getNewItem.body).toMatchObject({
      _id: expect.any(Number),
      name: expect.any(String),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
    });
    expect(getNewItem.body).toMatchObject({
      _id: 17,
      name: "Place 17",
      wheelchair: "No",
      wheelchairDesc: "No information",
    });
  });

  it("PATCH /api/accessinfo/:id - Status 200: Test to check updates to posts/documents are submitted correctly to the database", async () => {
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

  it("DELETE /api/accessinfo/:id - Status 204: Test to check that a post/document is deleted using it's _id", async () => {
    const deletedInfo = await request(app)
      .delete("/api/accessinfo/15")
      .expect(204);
  });
});

describe("GET - Error testing", () => {
  it("/nopathway - Error 404 if the requested route does not exist", async () => {
    const res = await request(app).get("/nopathway").expect(404);
    expect(res.body.msg).toEqual("Invalid URL");
  });
  it("/api/wrongpath - Error 404 if the requested route on /api does not exist", async () => {
    const res = await request(app).get("/api/wrongpath").expect(404);
    expect(res.body.msg).toEqual("Invalid URL");
  });
  it("/api/accessinfo/notanid - Error 404 if an invalid id is requested on a correct and valid path", async () => {
    const res = await request(app).get("/api/accessinfo/notanid").expect(400);
    expect(res.body.msg).toEqual("Bad request");
  });
  it("/api/accessinfo/22 - Error 404 if an invalid id is requested on a correct and valid path", async () => {
    const res = await request(app).get("/api/accessinfo/22").expect(404);
    expect(res.body.msg).toEqual("Not found");
  });
});

describe("POST - Error testing", () => {
  it("/api/accessinfo - Error 400 A malformed body / missing required fields (no _id input)", async () => {
    const res = await request(app)
      .post("/api/accessinfo")
      .send({
        name: "Place 17",
        wheelchair: "Yes",
        wheelchairDesc: "ABC",
      })
      .expect(400);
    expect(res.body.msg).toEqual("Bad request");
  });
  it("/api/accessinfo - Error 400 A malformed body / missing required fields (no name input)", async () => {
    const res = await request(app)
      .post("/api/accessinfo")
      .send({
        _id: 17,
        wheelchair: "Yes",
        wheelchairDesc: "ABC",
      })
      .expect(400);
    expect(res.body.msg).toEqual("Bad request");
  });
  it("/api/notapath - Error 404 If a valid post request is made to a path which does not exist", async () => {
    const res = await request(app)
      .post("/api/notapath")
      .send({
        _id: 18,
        name: "Place 18",
        wheelchair: "Yes",
        wheelchairDesc: "ABC",
      })
      .expect(404);
    expect(res.body.msg).toEqual("Invalid URL");
  });
  it("/api/notapath - Error 404 If a valid post request is made to a path which does not exist", async () => {
    const res = await request(app)
      .post("/api/accessinfo")
      .send({
        _id: 19,
        name: "Place 19",
        wheelchair: "Yes",
        wheelchairDesc: "ABC",
        notACorrectKey: "I do not exist in the schema",
      })
      .expect(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(Object.keys(res.body)).toHaveLength(5);
    expect(res.body).not.toContain({
      notACorrectKey: "I do not exist in the schema",
    });
    expect(res.body).toMatchObject({
      _id: expect.any(Number),
      name: expect.any(String),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
    });
    expect(res.body).toMatchObject({
      _id: 19,
      name: "Place 19",
      wheelchair: "Yes",
      wheelchairDesc: "ABC",
    });
  });
});

describe("PATCH - Error testing", () => {
  it("/api/accessinfo/333 - Status 404 when resource/ID does not exist during a PATCH operation", async () => {
    const updatedElements = {
      wheelchairDesc: "new entry text",
    };

    const res = await request(app)
      .patch("/api/accessinfo/333")
      .send(updatedElements)
      .expect(404);
    expect(res.body.msg).toEqual("Not found");
  });

  it("/api/accessinfo/notanid - Status 400 when a PATCH request is done on an invalid path", async () => {
    const updatedElements = {
      wheelchairDesc: "new entry text",
    };

    const res = await request(app)
      .patch("/api/accessinfo/notanid")
      .send(updatedElements)
      .expect(400);
    expect(res.body.msg).toEqual("Bad request");
  });

  it("/api/accessinfo/:id Status 200: An patch request which includes a key which does not exist in the schema, is not added/patched on to the entry", async () => {
    const updatedElements = {
      keyDoesNoteExist: "This key doesnt exist in the schema",
    };

    const res = await request(app)
      .patch("/api/accessinfo/3")
      .send(updatedElements)
      .expect(200);
    expect(res.body).toEqual({ acknowledged: false });
    const getNewItem = await request(app).get("/api/accessinfo/3").expect(200);
    expect(getNewItem.body).toBeInstanceOf(Object);
    expect(Object.keys(getNewItem.body)).toHaveLength(5);
    expect(getNewItem.body).not.toContain({
      keyDoesNoteExist: "This key doesnt exist in the schema",
    });
    expect(getNewItem.body).toMatchObject({
      _id: expect.any(Number),
      name: expect.any(String),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
    });
    expect(getNewItem.body).toMatchObject({
      _id: 3,
      name: "Place 3",
      wheelchair: "No",
      wheelchairDesc: "No information",
    });
  });
});

describe("DELETE - Error testing", () => {
  it("/api/accessinfo/223 - Status 404 when resource/ID does not exist during a DELETE operation", async () => {
    const res = await request(app).delete("/api/accessinfo/223").expect(404);
    expect(res.body.msg).toEqual("Not found");
  });
  it("/api/accessinfo/notanid - Status 400 when a DELETE request is done on an invalid path", async () => {
    const res = await request(app)
      .delete("/api/accessinfo/notanid")
      .expect(400);
    expect(res.body.msg).toEqual("Bad request");
  });
});
