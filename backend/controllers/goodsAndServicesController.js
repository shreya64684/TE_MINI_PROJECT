const GoodsAndService = require('../models/GoodsAndServicesData');

// Create a new goods and service entry
const createGoodsAndService = async (req, res) => {
  try {
    const newGoodsAndService = new GoodsAndService(req.body);
    const savedGoodsAndService = await newGoodsAndService.save();
    res.status(201).json(savedGoodsAndService);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goods and service entry', error });
  }
};

// Get all goods and services entries
const getAllGoodsAndServices = async (req, res) => {
  try {
    const goodsAndServices = await GoodsAndService.find();
    res.status(200).json(goodsAndServices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goods and services entries', error });
  }
};

// Get a specific goods and service entry by ID
const getGoodsAndServiceById = async (req, res) => {
  try {
    const goodsAndService = await GoodsAndService.findById(req.params.id);
    if (!goodsAndService) {
      return res.status(404).json({ message: 'Goods and Service not found' });
    }
    res.status(200).json(goodsAndService);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goods and service entry', error });
  }
};

// Update a goods and service entry by ID
const updateGoodsAndService = async (req, res) => {
  try {
    const updatedGoodsAndService = await GoodsAndService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGoodsAndService) {
      return res.status(404).json({ message: 'Goods and Service not found' });
    }
    res.status(200).json(updatedGoodsAndService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goods and service entry', error });
  }
};

// Delete a goods and service entry by ID
const deleteGoodsAndService = async (req, res) => {
  try {
    const deletedGoodsAndService = await GoodsAndService.findByIdAndDelete(req.params.id);
    if (!deletedGoodsAndService) {
      return res.status(404).json({ message: 'Goods and Service not found' });
    }
    res.status(200).json({ message: 'Goods and Service entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goods and service entry', error });
  }
};

module.exports = {
  createGoodsAndService,
  getAllGoodsAndServices,
  getGoodsAndServiceById,
  updateGoodsAndService,
  deleteGoodsAndService
};
