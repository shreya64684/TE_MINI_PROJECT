const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const {
  createWaste,
  getAllWastes,
  getWasteById,
  updateWaste,
  deleteWaste
} = require('../controllers/wasteController');

// @route   POST /api/wastes
// @desc    Create a new waste entry
// @access  Private (only certain roles allowed)
router.post('/', verifyToken, verifyRole(['Admin', 'WasteManager']), createWaste);

// @route   GET /api/wastes
// @desc    Get all waste entries
// @access  Private
router.get('/', verifyToken, getAllWastes);

// @route   GET /api/wastes/:id
// @desc    Get a specific waste entry by ID
// @access  Private
router.get('/:id', verifyToken, getWasteById);

// @route   PUT /api/wastes/:id
// @desc    Update a waste entry by ID
// @access  Private (only Admins)
router.put('/:id', verifyToken, verifyRole(['Admin']), updateWaste);

// @route   DELETE /api/wastes/:id
// @desc    Delete a waste entry by ID
// @access  Private (only Admins)
router.delete('/:id', verifyToken, verifyRole(['Admin']), deleteWaste);

module.exports = router;
