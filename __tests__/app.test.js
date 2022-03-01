// accessinfo.test.js - Test file for all API requests to /api/accessinfo

const request = require("supertest");
const app = require("../app.js");
const AccessInfo = require("../models/accessinfo.model.js");
const Users = require("../models/users.model.js");
const { testData, userTestData } = require("../db/seed-test.js");
const mongoose = require("mongoose");

// Before starting tests - clear out the existing test data, and re-seed with fresh and reset test data
beforeAll(async () => {
  await AccessInfo.deleteMany({});
  await AccessInfo.insertMany(testData);

  await Users.deleteMany({});
  await Users.insertMany(userTestData);

  console.log("TEST database is now seeded.");
});

// After all tests ends, disconnect the mongoose connection
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Data Structure Test", () => {
  it("Tests that the accessibility rating array of numbers can be calculated on and output an average score of all numbers in that array", () => {
    function calcAvgRating(testData) {
      for (const key of testData) {
        if (key._id === 1) {
          const arrayOfNumbers = key.accessibility_ratings;
          const arrayLength = key.accessibility_ratings.length;
          const arrayTotal = arrayOfNumbers.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          const averageScore = Math.round(arrayTotal / arrayLength);
          return averageScore;
        }
      }
    }
    expect(calcAvgRating(testData)).toBe(4);
  });
  it("Tests that the attitude rating array of numbers can be calculated on and output an average score of all numbers in that array", () => {
    function calcAvgRating(testData) {
      for (const key of testData) {
        if (key._id === 1) {
          const arrayOfNumbers = key.attitude_ratings;
          const arrayLength = key.attitude_ratings.length;
          const arrayTotal = arrayOfNumbers.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          const averageScore = Math.round(arrayTotal / arrayLength);
          return averageScore;
        }
      }
    }
    expect(calcAvgRating(testData)).toBe(4);
  });
  it("Tests that the equality rating array of numbers can be calculated on and output an average score of all numbers in that array", () => {
    function calcAvgRating(testData) {
      for (const key of testData) {
        if (key._id === 1) {
          const arrayOfNumbers = key.equality_ratings;
          const arrayLength = key.equality_ratings.length;
          const arrayTotal = arrayOfNumbers.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          const averageScore = Math.round(arrayTotal / arrayLength);
          return averageScore;
        }
      }
    }
    expect(calcAvgRating(testData)).toBe(4);
  });
});

describe("Basic tests - GET/POST/PATCH/DELETE:", () => {
  it("GET /api - Status 200: Test to check the endpoints.json is returned", async () => {
    const res = await request(app).get("/api").expect(200);
    expect(res.body.allEndPoints).toBeInstanceOf(Object);
  });

  it("GET /api/accessinfo - Status 200: Test to check and return all documents in the database", async () => {
    const allInfo = await request(app).get("/api/accessinfo").expect(200);
    expect(allInfo.body).toBeInstanceOf(Array);
    expect(allInfo.body.length).toBeGreaterThan(0);
    expect(allInfo.body).toHaveLength(15);
    allInfo.body.forEach((eachItem) => {
      expect(eachItem).toMatchObject({
        _id: expect.any(Number),
        osm_type: expect.any(String),
        name: expect.any(String),
        lat: expect.any(Array),
        lon: expect.any(Number),
        wheelchair: expect.any(String),
        accessibility_ratings: expect.any(Array),
        attitude_ratings: expect.any(Array),
        equality_ratings: expect.any(Array),
      });
    });
  });

  it("GET By ID /api/accessinfo/:id - Status 200: Test to check and returned a specified document from the database", async () => {
    const specificInfo = await request(app)
      .get("/api/accessinfo/1")
      .expect(200);
    expect(specificInfo.body).toBeInstanceOf(Object);
    expect(Object.keys(specificInfo.body)).toHaveLength(12);
    expect(specificInfo.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(specificInfo.body).toMatchObject({
      _id: 1,
      osm_type: "node",
      name: "Place 1",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "Yes",
      wheelchairDesc: "1 ramp",
      accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
    });
  });

  it("GET /api/users - Status 200: Test to check and returned a specified document from the users database", async () => {
    const res = await request(app).get("/api/users").expect(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).toHaveLength(1);
    res.body.forEach((eachItem) => {
      expect(eachItem).toMatchObject({
        _id: expect.any(String),
        username: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        city: expect.any(String),
        avatar_url: expect.any(String),
        wheelchairUser: expect.any(Boolean),
      });
    });
  });

  it("POST /api/accessinfo - Status 201: Test to check that a new post/document is submitted correctly to the database", async () => {
    const newItem = await request(app)
      .post("/api/accessinfo")
      .send({
        _id: 16,
        osm_type: "node",
        name: "Place 16",
        lat: [53.5956275],
        lon: 9.998174,
        wheelchair: "Yes",
        wheelchairDesc: "ABC",
        accessibility_ratings: [],
        attitude_ratings: [],
        equality_ratings: [],
      })
      .expect(201);
    const getNewItem = await request(app).get("/api/accessinfo/16").expect(200);
    expect(newItem).not.toBe(getNewItem.body);
    expect(getNewItem.body).toBeInstanceOf(Object);
    expect(getNewItem.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(getNewItem.body).toMatchObject({
      _id: 16,
      osm_type: "node",
      name: "Place 16",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "Yes",
      wheelchairDesc: "ABC",
      accessibility_ratings: [],
      attitude_ratings: [],
      equality_ratings: [],
    });
  });

  it("POST /api/accessinfo - Status 201: Test to check that a new post/document is submitted correctly to the database, tests that 2 fields default to schema settings if missing", async () => {
    const newItem = await request(app)
      .post("/api/accessinfo")
      .send({
        _id: 17,
        osm_type: "node",
        name: "Place 17",
        lat: [53.5956275],
        lon: 9.998174,
      })
      .expect(201);
    const getNewItem = await request(app).get("/api/accessinfo/17").expect(200);
    expect(newItem).not.toBe(getNewItem.body);
    expect(getNewItem.body).toBeInstanceOf(Object);
    expect(getNewItem.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(getNewItem.body).toMatchObject({
      _id: 17,
      osm_type: "node",
      name: "Place 17",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "No",
      wheelchairDesc: "No information",
      accessibility_ratings: [],
      attitude_ratings: [],
      equality_ratings: [],
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
    expect(Object.keys(getUpdatedItem.body)).toHaveLength(12);
    expect(getUpdatedItem.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(getUpdatedItem.body).toMatchObject({
      _id: 13,
      osm_type: "way",
      name: "Place 13",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchairDesc: "decent but not amazing",
      accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
    });
  });

  it("PATCH /api/accessinfo/:id - Status 200: Test to check an accessibility_rating is added to the existing array", async () => {
    const updatedElements = {
      accessibility_ratings: 98,
    };

    const updatedItem = await request(app)
      .patch("/api/accessinfo/14")
      .send(updatedElements)
      .expect(200);
    const getUpdatedItem = await request(app)
      .get("/api/accessinfo/14")
      .expect(200);
    expect(Object.keys(getUpdatedItem.body)).toHaveLength(12);
    expect(getUpdatedItem.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(getUpdatedItem.body).toMatchObject({
      _id: 14,
      osm_type: "node",
      name: "Place 14",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "Yes",
      wheelchairDesc: "All rooms accesible",
      accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3, 98],
      attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
    });
  });

  it("PATCH /api/accessinfo/:id - Status 200: Test to check an attitude_rating is added to the existing array", async () => {
    const updatedElements = {
      attitude_ratings: 54,
    };

    const updatedItem = await request(app)
      .patch("/api/accessinfo/10")
      .send(updatedElements)
      .expect(200);
    const getUpdatedItem = await request(app)
      .get("/api/accessinfo/10")
      .expect(200);
    expect(Object.keys(getUpdatedItem.body)).toHaveLength(12);
    expect(getUpdatedItem.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(getUpdatedItem.body).toMatchObject({
      _id: 10,
      osm_type: "way",
      name: "Place 10",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "Yes",
      wheelchairDesc: "Entrance has no steps, all rooms accessible",
      accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3, 54],
      equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
    });
  });

  it("PATCH /api/accessinfo/:id - Status 200: Test to check an equality_rating is added to the existing array", async () => {
    const updatedElements = {
      equality_ratings: 32,
    };

    const updatedItem = await request(app)
      .patch("/api/accessinfo/3")
      .send(updatedElements)
      .expect(200);
    const getUpdatedItem = await request(app)
      .get("/api/accessinfo/3")
      .expect(200);
    expect(Object.keys(getUpdatedItem.body)).toHaveLength(12);
    expect(getUpdatedItem.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(getUpdatedItem.body).toMatchObject({
      _id: 3,
      osm_type: "node",
      name: "Place 3",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "No",
      accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3, 32],
    });
  });

  it("PATCH /api/accessinfo/:id - Status 200: Add a new comment to a venue", async () => {
    const newComment = {
      comments: {
        author: "joe",
        body: "Body 3",
        commentDate: "2022-02-24T21:03:01.138Z",
        total_confirmed_votes: 32,
      },
    };

    const updatedItem = await request(app)
      .patch("/api/accessinfo/15")
      .send(newComment)
      .expect(200);
    const getUpdatedItem = await request(app)
      .get("/api/accessinfo/15")
      .expect(200);
    expect(Object.keys(getUpdatedItem.body)).toHaveLength(12);
    expect(getUpdatedItem.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
      comments: expect.any(Array),
    });
    expect(getUpdatedItem.body.comments).toBeInstanceOf(Array);
    expect(Object.keys(getUpdatedItem.body.comments)).toHaveLength(2);
    expect(getUpdatedItem.body).toMatchObject({
      _id: 15,
      osm_type: "relation",
      name: "Place 15",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "Limited",
      wheelchairDesc:
        "Entrance is easily accessible, but there are steps half way into the building with are not accessible",
      accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      comments: [
        {
          author: "joe",
          body: "Comment 1",
          commentDate: "2022-02-24T21:03:01.138Z",
          total_confirmed_votes: 3,
        },
        {
          author: "joe",
          body: "Body 3",
          commentDate: "2022-02-24T21:03:01.138Z",
          total_confirmed_votes: 32,
        },
      ],
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
        _id: 21,
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
  it("/api/notapath - Status 201 A post request which includes a key which does not exist in the schema, is not added/patched on to the entry", async () => {
    const res = await request(app)
      .post("/api/accessinfo")
      .send({
        _id: 19,
        osm_type: "node",
        name: "Place 19",
        lat: [53.5956275],
        lon: 9.998174,
        wheelchair: "Yes",
        wheelchairDesc: "ABC",
        accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
        attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
        equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
        notACorrectKey: "I do not exist in the schema",
      })
      .expect(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(Object.keys(res.body)).toHaveLength(12);
    expect(res.body).not.toContain({
      notACorrectKey: "I do not exist in the schema",
    });
    expect(res.body).toMatchObject({
      _id: expect.any(Number),
      osm_type: expect.any(String),
      name: expect.any(String),
      lat: expect.any(Array),
      lon: expect.any(Number),
      wheelchair: expect.any(String),
      wheelchairDesc: expect.any(String),
      accessibility_ratings: expect.any(Array),
      attitude_ratings: expect.any(Array),
      equality_ratings: expect.any(Array),
    });
    expect(res.body).toMatchObject({
      _id: 19,
      osm_type: "node",
      name: "Place 19",
      lat: [53.5956275],
      lon: 9.998174,
      wheelchair: "Yes",
      wheelchairDesc: "ABC",
      accessibility_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      attitude_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
      equality_ratings: [5, 4, 5, 4, 3, 5, 4, 3, 1, 4, 3],
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

  it("/api/accessinfo/notanid - Status 400 when a PATCH request is done on an invalid path", async () => {
    const updatedElements = {
      accessibility_ratings: "String which shouldn't be allowed into array",
    };

    const res = await request(app)
      .patch("/api/accessinfo/1")
      .send(updatedElements)
      .expect(400);
    expect(res.body.msg).toEqual("Bad request");
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
