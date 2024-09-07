import sqlite3 from "sqlite3";
import TasksRepository from "./repositories/tasks.repository";

// If we're not running on docker just use an in-memory database
const DATABASE = process.env.DOCKER_DB_PATH ?? ":memory:";

const initializeRepositories = async () => {
  const db = new sqlite3.Database(DATABASE, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  console.log(`Connected to the database`);
  const tasksRepository = new TasksRepository(db);
  await tasksRepository.createTable();

  return { tasksRepository };
};

export { initializeRepositories };
