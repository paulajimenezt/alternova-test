import { initializeDatabase } from "../../tests/utils/testDb";
import { Task, TaskStatus } from "../models/Task.model";
import TaskRepository from "./tasks.repository";

let taskRepository: TaskRepository;
beforeEach(() => {
  const db = initializeDatabase().db;
  taskRepository = new TaskRepository(db);
  taskRepository.createTable();
});

afterAll(() => {
  // Close the database connection or cleanup if needed
});

describe("TaskRepository", () => {
  test.only("should insert a new task", () => {
    const newTask: Task = {
      title: "Test Task",
      description: "This is a test task",
      status: TaskStatus.ACTIVE,
      createdAt: new Date().toISOString(),
    };

    taskRepository.insertTask(newTask);
    taskRepository.getAllTasks().then((tasks) => {
      expect(tasks).toHaveLength(1);
      expect(tasks[0].title).toBe("Test Task");
      expect(tasks[0].status).toBe(TaskStatus.ACTIVE);
    });
  });

  test("should mark a task as complete", async () => {
    const newTask: Omit<Task, "id"> = {
      title: "Task to Complete",
      description: "This task will be completed",
      status: TaskStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    taskRepository.insertTask(newTask);

    const tasksBefore = await taskRepository.getAllTasks();
    const taskId = tasksBefore[0].id as number;

    taskRepository.markTaskAsComplete(taskId);

    const tasksAfter = await taskRepository.getAllTasks();
    expect(tasksAfter[0].status).toBe(TaskStatus.COMPLETE);
    expect(tasksAfter[0].completedAt).not.toBeNull();
  });

  test("should delete a task", async () => {
    const newTask: Omit<Task, "id"> = {
      title: "Task to Delete",
      description: "This task will be deleted",
      status: TaskStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    taskRepository.insertTask(newTask);

    let tasks = await taskRepository.getAllTasks();
    const taskId = tasks[0].id as number;

    taskRepository.deleteTask(taskId);

    tasks = await taskRepository.getAllTasks();
    expect(tasks).toHaveLength(0);
  });
});
