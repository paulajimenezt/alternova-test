import sqlite3 from "sqlite3";

const initializeDatabase = () => {
  const db = new sqlite3.Database(":memory:");
  return { db };
};

export { initializeDatabase };
