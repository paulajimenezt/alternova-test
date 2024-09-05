import express from "express";
import tasksRouter from "./routes/tasks.routes";

const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);

export default app;
