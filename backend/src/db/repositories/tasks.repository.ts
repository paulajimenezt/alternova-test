import { Database } from "sqlite3";
import { promisify } from "util";
import { Task, TaskStatus } from "../models/Task.model";

export default class TaskRepository {
  public db: Database;
  private run: (sql: string, params?: any[]) => Promise<void>;
  private all: (sql: string, params?: any[]) => Promise<Task[]>;
  private get: (sql: string, params?: any[]) => Promise<Task>;

  constructor(db: Database) {
    this.db = db;
    this.run = promisify(db.run.bind(db));
    this.all = promisify(db.all.bind(db));
    this.get = promisify(db.get.bind(db));
  }

  public async createTable(): Promise<void> {
    try {
      await this.run(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'COMPLETE')),
          createdAt TEXT default CURRENT_TIMESTAMP,
          updatedAt TEXT,
          completedAt TEXT
        )`
      );
      console.log("Tasks table created");
    } catch (err) {
      console.error("Error creating tasks table:", err.message);
      throw err;
    }
  }

  public async insertTask(task: Partial<Task>): Promise<Task> {
    const createdAt = new Date().toISOString();
    const status = TaskStatus.ACTIVE;
    const { title, description } = task;
    try {
      await this.run(
        `INSERT INTO tasks (title, description, status, createdAt) VALUES (?, ?, ?, ?)`,
        [title, description, status, createdAt]
      );

      const result = await this.get(`SELECT last_insert_rowid() as id`);
      const taskId = result.id;

      const createdTask = await this.get(`SELECT * FROM tasks WHERE id = ?`, [
        taskId,
      ]);

      return createdTask;
    } catch (err) {
      console.error("Error inserting task:", err.message);
      throw err;
    }
  }

  public async updateTask(
    taskId: number,
    title?: string,
    description?: string,
    status?: TaskStatus
  ): Promise<Task> {
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
    if (status) {
      updateQuery += ", status = ?";
      params.push(status);
    }
    updateQuery += " WHERE id = ?";
    params.push(taskId);
    try {
      await this.run(updateQuery, params);
      const updatedTask = await this.get(`SELECT * FROM tasks WHERE id = ?`, [
        taskId,
      ]);
      return updatedTask;
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
