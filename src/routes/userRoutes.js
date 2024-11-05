/**
 * User Routes
 * Defines all routes for user operations
 */
const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Route definitions with comments
router.get('/', UserController.getAllUsers);      // Get all users
router.get('/:id', UserController.getUserById);   // Get user by ID
router.post('/', UserController.createUser);      // Create new user

module.exports = router;