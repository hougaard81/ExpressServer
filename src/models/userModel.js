/**
 * User Model
 * Handles all database operations for users
 */
const db = require('../config/database');

class UserModel {
  /**
   * Get all users from the database
   * @returns {Promise<Array>} Array of user objects
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users ORDER BY created_at DESC';
      db.all(query, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  /**
   * Get a single user by ID
   * @param {number} id User ID
   * @returns {Promise<Object>} User object
   */
  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.get(query, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  /**
   * Create a new user
   * @param {Object} userData User data (name, email)
   * @returns {Promise<Object>} Created user object
   */
  static create(userData) {
    return new Promise((resolve, reject) => {
      const { name, email } = userData;
      
      // Input validation
      if (!name || !email) {
        reject(new Error('Name and email are required'));
        return;
      }

      const query = `
        INSERT INTO users (name, email)
        VALUES (?, ?)
        RETURNING *
      `;
      
      db.get(query, [name, email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
}

module.exports = UserModel;
