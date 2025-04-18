import request from "supertest";
import app from "../app";

describe("User Routes", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "Test User",
      email: "test@example.com",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test User");
  });

  it("should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "Test User",
      email: "test@example.com",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });
});
