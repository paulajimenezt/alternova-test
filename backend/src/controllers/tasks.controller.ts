import { Request, Response } from "express";
import TaskRepository from "../db/repositories/tasks.repository";
import { Task } from "../db/models/Task.model";

export class TaskController {
  taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskRepository.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const task: Omit<Task, "id"> = req.body;
      const createdTask = await this.taskRepository.insertTask(task);
      res.status(201).json(createdTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.taskId, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    try {
      const { title, description } = req.body;
      await this.taskRepository.updateTask(taskId, title, description);
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async markTaskAsComplete(req: Request, res: Response) {
    const taskId = parseInt(req.params.taskId, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    try {
      await this.taskRepository.markTaskAsComplete(taskId);
      res.status(200).json({ message: "Task marked as complete" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const taskId = parseInt(req.params.taskId, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    try {
      await this.taskRepository.deleteTask(taskId);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
