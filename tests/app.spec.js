const request = require("supertest");
const app = require("../src/app");

describe("Test the /directory api", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/directory?directoryPath=/");
    expect(response.statusCode).toBe(200);
    expect(response.body.list).toBeDefined();
  });

  test("Fail the api with incorrect directory path", async () => {
    const response = await request(app).get("/directory?directoryPath=");
    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(400);
  });
});
