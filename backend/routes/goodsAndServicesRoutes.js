const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const {
  createGoodsAndService,
  getAllGoodsAndServices,
  getGoodsAndServiceById,
  updateGoodsAndService,
  deleteGoodsAndService
} = require('../controllers/goodsAndServicesController');

// @route   POST /api/goods-services
// @desc    Create a new goods and service entry
// @access  Private (only certain roles allowed)
router.post('/', verifyToken, verifyRole(['Admin', 'Supplier']), createGoodsAndService);

// @route   GET /api/goods-services
// @desc    Get all goods and service entries
// @access  Private
router.get('/', verifyToken, getAllGoodsAndServices);

// @route   GET /api/goods-services/:id
// @desc    Get a specific goods and service entry by ID
// @access  Private
router.get('/:id', verifyToken, getGoodsAndServiceById);

// @route   PUT /api/goods-services/:id
// @desc    Update a goods and service entry by ID
// @access  Private (only Admins)
router.put('/:id', verifyToken, verifyRole(['Admin']), updateGoodsAndService);

// @route   DELETE /api/goods-services/:id
// @desc    Delete a goods and service entry by ID
// @access  Private (only Admins)
router.delete('/:id', verifyToken, verifyRole(['Admin']), deleteGoodsAndService);

module.exports = router;
