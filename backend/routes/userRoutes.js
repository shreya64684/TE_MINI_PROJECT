const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Routes for user registration, login, and user management
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // User login
router.get('/:id', getUserById); // Get user details by ID
router.put('/:id', updateUser); // Update user details by ID
router.delete('/:id', deleteUser); // Delete user by ID

module.exports = router;
