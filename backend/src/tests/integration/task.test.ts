import request from "supertest";
import app from "../testServer";

describe("Tasks Routes", () => {
  it("should return a JSON response with 'GET /tasks'", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "GET /tasks" });
  });

  it("should return a JSON response with 'POST /tasks'", async () => {
    const response = await request(app).post("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "POST /tasks" });
  });
});
