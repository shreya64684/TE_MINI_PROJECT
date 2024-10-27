const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const {
  createFuel,
  getAllFuels,
  getFuelById,
  updateFuel,
  deleteFuel
} = require('../controllers/fuelController');

// @route   POST /api/fuels
// @desc    Create a new fuel entry
// @access  Private (only certain roles allowed)
router.post('/', verifyToken, verifyRole(['Admin', 'FuelProvider']), createFuel);

// @route   GET /api/fuels
// @desc    Get all fuel entries
// @access  Private
router.get('/', verifyToken, getAllFuels);

// @route   GET /api/fuels/:id
// @desc    Get a specific fuel entry by ID
// @access  Private
router.get('/:id', verifyToken, getFuelById);

// @route   PUT /api/fuels/:id
// @desc    Update a fuel entry by ID
// @access  Private (only Admins)
router.put('/:id', verifyToken, verifyRole(['Admin']), updateFuel);

// @route   DELETE /api/fuels/:id
// @desc    Delete a fuel entry by ID
// @access  Private (only Admins)
router.delete('/:id', verifyToken, verifyRole(['Admin']), deleteFuel);

module.exports = router;
