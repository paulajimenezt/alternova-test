import { Database } from "sqlite3";
import { promisify } from "util";
import { Task, TaskStatus } from "../models/Task.model";

export default class TaskRepository {
  private db: Database;
  private run: (sql: string, params?: any[]) => Promise<void>;
  private all: (sql: string, params?: any[]) => Promise<any[]>;

  constructor(db: Database) {
    this.db = db;
    this.run = promisify(db.run.bind(db));
    this.all = promisify(db.all.bind(db));
  }

  public async createTable(): Promise<void> {
    try {
      await this.run(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          completedAt TEXT
        )`
      );
      console.log("Tasks table created");
    } catch (err) {
      console.error("Error creating tasks table:", err.message);
      throw err;
    }
  }

  public async insertTask(task: Omit<Task, "id">): Promise<void> {
    const { title, description, status, createdAt, updatedAt, completedAt } =
      task;
    try {
      await this.run(
        `INSERT INTO tasks (title, description, status, createdAt, updatedAt, completedAt) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, status, createdAt, updatedAt, completedAt]
      );
    } catch (err) {
      console.error("Error inserting task:", err.message);
      throw err;
    }
  }

  public async updateTask(
    taskId: number,
    title?: string,
    description?: string
  ): Promise<void> {
    const updatedAt = new Date().toISOString();
    const params: any[] = [updatedAt];
    let updateQuery = "UPDATE tasks SET updatedAt = ?";
    if (title) {
      updateQuery += ", title = ?";
      params.push(title);
    }
    if (description) {
      updateQuery += ", description = ?";
      params.push(description);
    }
    updateQuery += " WHERE id = ?";
    params.push(taskId);
    try {
      await this.run(updateQuery, params);
    } catch (err) {
      console.error("Error updating task:", err.message);
      throw err;
    }
  }

  public async getAllTasks(): Promise<Task[]> {
    try {
      const rows = await this.all("SELECT * FROM tasks");
      return rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status as TaskStatus,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        completedAt: row.completedAt,
      }));
    } catch (err) {
      console.error("Error getting all tasks:", err.message);
      throw err;
    }
  }

  public async markTaskAsComplete(taskId: number): Promise<void> {
    const completedAt = new Date().toISOString();
    const status = TaskStatus.COMPLETE;
    try {
      await this.run(
        `UPDATE tasks SET status = ?, completedAt = ? WHERE id = ?`,
        [status, completedAt, taskId]
      );
    } catch (err) {
      console.error("Error marking task as complete:", err.message);
      throw err;
    }
  }

  public async deleteTask(taskId: number): Promise<void> {
    try {
      await this.run(`DELETE FROM tasks WHERE id = ?`, [taskId]);
    } catch (err) {
      console.error("Error deleting task:", err.message);
      throw err;
    }
  }
}
