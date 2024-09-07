import request from "supertest";
import app from "../utils/testServer";
import { TaskStatus } from "../../db/models/Task.model";

describe("Tasks Routes", () => {
  it("should get all tasks with 'GET /tasks'", async () => {
    const newTask = {
      title: "Test Task",
      description: "A new task to test",
    };
    await request(app).post("/tasks").send(newTask);
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should create a new task with 'POST /tasks'", async () => {
    const newTask = {
      title: "Test Task",
      description: "A new task to test",
    };
    const response = await request(app).post("/tasks").send(newTask);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newTask.title);
  });

  it("should edit a task with 'POST /tasks/:taskId/edit'", async () => {
    const oldTask = {
      title: "old Task",
      description: "A new task to test",
    };
    const savedTask = await request(app).post("/tasks").send(oldTask);
    expect(savedTask.body.status).toBe(TaskStatus.ACTIVE);
    expect(savedTask.body.updatedAt).toBeNull();
    const updatedTask = {
      id: savedTask.body.id,
      title: "updated Task",
      description: "A new task to test",
      status: TaskStatus.COMPLETE,
    };
    const response = await request(app).post("/tasks/1/edit").send(updatedTask);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("updated Task");
    expect(response.body.status).toBe(TaskStatus.COMPLETE);
    expect(response.body.updatedAt).not.toBeNull();
  });

  it("should return 400 when sending an unknown status 'POST /tasks/:taskId/edit'", async () => {
    const updatedTask = {
      id: 5,
      title: "updated Task",
      description: "A new task to test",
      status: "PENDING",
    };
    const response = await request(app).post("/tasks/5/edit").send(updatedTask);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid status");
  });

  it("should mark a task as complete with 'POST /tasks/:taskId/complete'", async () => {
    const response = await request(app).post("/tasks/1/complete");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task marked as complete");
  });

  it("should delete a task with 'DELETE /tasks/:taskId'", async () => {
    const newTask = {
      title: "Test Task",
      description: "A new task to test",
    };
    await request(app).post("/tasks").send(newTask);
    const response = await request(app).delete("/tasks/1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
  });
});
