const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware'); // Authentication & Role middleware
const {
  createRawMaterial,
  getAllRawMaterials,
  getRawMaterialById,
  updateRawMaterial,
  deleteRawMaterial
} = require('../controllers/rawMaterialController'); // Importing controller functions

// @route   POST /api/raw-materials
// @desc    Create a new raw material entry
// @access  Private (only certain roles allowed)
router.post('/create-raw-material', verifyToken, verifyRole(['Admin', 'RawMaterialProvider']), createRawMaterial);

// @route   GET /api/raw-materials
// @desc    Get all raw material entries
// @access  Private
router.get('/', verifyToken, getAllRawMaterials);

// @route   GET /api/raw-materials/:id
// @desc    Get a specific raw material entry by ID
// @access  Private
router.get('/:id', verifyToken, getRawMaterialById);

// @route   PUT /api/raw-materials/:id
// @desc    Update a raw material entry by ID
// @access  Private (only Admins)
router.put('/:id', verifyToken, verifyRole(['Admin']), updateRawMaterial);

// @route   DELETE /api/raw-materials/:id
// @desc    Delete a raw material entry by ID
// @access  Private (only Admins)
router.delete('/:id', verifyToken, verifyRole(['Admin']), deleteRawMaterial);

module.exports = router;
