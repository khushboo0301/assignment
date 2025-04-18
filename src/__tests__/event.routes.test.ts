import request from "supertest";
import app from "../app";

describe("Event Routes", () => {
  let userId: string;

  beforeAll(async () => {
    // create a real user and grab its ID
    const u = await request(app)
      .post("/users")
      .send({ name: "Ev Test User", email: "ev@example.com" });
    userId = u.body.data.user.id;
  });

  it("rejects create without user-id header", async () => {
    const res = await request(app).post("/events").send({
      title: "Tech Talk",
      description: "Cool stuff",
      date: new Date().toISOString(),
      location: "Zoom",
    });
    expect(res.statusCode).toBe(401);
  });

  it("creates an event when user-id is provided", async () => {
    const res = await request(app).post("/events").set("user-id", userId).send({
      title: "Tech Meetup",
      description: "Meet devs",
      date: new Date().toISOString(),
      location: "Community Hall",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("data.event.id");
    expect(res.body.data.event.title).toBe("Tech Meetup");
  });

  it("lists events with pagination", async () => {
    const res = await request(app).get("/events?limit=10&offset=0");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data.events)).toBe(true);
  });
});
