import express from "express";
import { initializeRepositories } from "./db/db";
import { TaskController } from "./controllers/tasks.controller";
import createTaskRouter from "./routes/tasks.routes";

const app = express();

const initializeApp = async () => {
  const { tasksRepository } = await initializeRepositories();
  const taskController = new TaskController(tasksRepository);

  app.use(express.json());
  app.use("/tasks", createTaskRouter(taskController));
};

const appInitialization = initializeApp();
export { app, appInitialization };
