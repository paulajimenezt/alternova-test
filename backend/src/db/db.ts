import sqlite3 from "sqlite3";
import path from "path";
import TasksRepository from "./repositories/tasks.repository";

// If we're not running on docker just use an in-memory database
const DATABASE = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : ":memory:";

const initializeRepositories = async () => {
  const db = new sqlite3.Database(DATABASE, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  const tasksRepository = new TasksRepository(db);
  await tasksRepository.createTable();

  return { tasksRepository };
};

export { initializeRepositories };
