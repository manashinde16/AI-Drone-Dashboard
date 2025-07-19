const db = require("./db");

const initDb = async () => {
  try {
    // Drones table
    await db.query(`
      CREATE TABLE IF NOT EXISTS drones (
        id SERIAL PRIMARY KEY,
        drone_id TEXT,
        location TEXT,
        date DATE
      );
    `);

    // Violations table
    await db.query(`
      CREATE TABLE IF NOT EXISTS violations (
        id TEXT PRIMARY KEY,
        type TEXT,
        timestamp TEXT,
        latitude FLOAT,
        longitude FLOAT,
        image_url TEXT,
        date DATE,
        drone_id TEXT,
        location TEXT
      );
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT
        );
    `);

    console.log("✅ Tables created or already exist");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

module.exports = initDb;
