/**
 * Database configuration and initialization
 * Uses SQLite for a simple, file-based database solution
 */
const sqlite3 = require('sqlite3').verbose(); // Enable verbose mode for better debugging
const path = require('path');

// Use path.join for cross-platform compatibility
const DB_PATH = path.join(__dirname, '..', 'database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit if database connection fails
  }
  console.log('Successfully connected to SQLite database');
  initializeDatabase();
});

/**
 * Initialize database schema
 * Creates tables if they don't exist
 */
function initializeDatabase() {
  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(schema, (err) => {
    if (err) {
      console.error('Schema initialization failed:', err.message);
      process.exit(1);
    }
    console.log('Database schema initialized successfully');
  });
}

module.exports = db;