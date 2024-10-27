const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const {
  createLogistics,
  getAllLogistics,
  getLogisticsById,
  updateLogistics,
  deleteLogistics
} = require('../controllers/logisticsController');

// @route   POST /api/logistics
// @desc    Create a new logistics entry
// @access  Private (only certain roles allowed)
router.post('/', verifyToken, verifyRole(['Admin', 'LogisticsProvider']), createLogistics);

// @route   GET /api/logistics
// @desc    Get all logistics entries
// @access  Private
router.get('/', verifyToken, getAllLogistics);

// @route   GET /api/logistics/:id
// @desc    Get a specific logistics entry by ID
// @access  Private
router.get('/:id', verifyToken, getLogisticsById);

// @route   PUT /api/logistics/:id
// @desc    Update a logistics entry by ID
// @access  Private (only Admins)
router.put('/:id', verifyToken, verifyRole(['Admin']), updateLogistics);

// @route   DELETE /api/logistics/:id
// @desc    Delete a logistics entry by ID
// @access  Private (only Admins)
router.delete('/:id', verifyToken, verifyRole(['Admin']), deleteLogistics);

module.exports = router;
