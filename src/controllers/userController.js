/**
 * User Controller
 * Handles HTTP requests for user operations
 */
const UserModel = require('../models/userModel');

class UserController {
  /**
   * Get all users
   * @route GET /api/users
   */
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.getAll();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   * @route GET /api/users/:id
   */
  static async getUserById(req, res, next) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          error: 'User not found' 
        });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new user
   * @route POST /api/users
   */
  static async createUser(req, res, next) {
    try {
      const newUser = await UserModel.create(req.body);
      res.status(201).json({ 
        success: true, 
        data: newUser,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;