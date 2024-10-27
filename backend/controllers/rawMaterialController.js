const RawMaterial = require('../models/RawMaterialData');

// Create a new raw material entry
const createRawMaterial = async (req, res) => {
  try {
    const newRawMaterial = new RawMaterial(req.body);
    const savedMaterial = await newRawMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Error creating raw material', error });
  }
};

// Get all raw material entries
const getAllRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await RawMaterial.find();
    res.status(200).json(rawMaterials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching raw materials', error });
  }
};

// Get a raw material entry by ID
const getRawMaterialById = async (req, res) => {
  try {
    const rawMaterial = await RawMaterial.findById(req.params.id);
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }
    res.status(200).json(rawMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching raw material', error });
  }
};

// Update a raw material entry by ID
const updateRawMaterial = async (req, res) => {
  try {
    const updatedMaterial = await RawMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Error updating raw material', error });
  }
};

// Delete a raw material entry by ID
const deleteRawMaterial = async (req, res) => {
  try {
    const deletedMaterial = await RawMaterial.findByIdAndDelete(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ message: 'Raw material not found' });
    }
    res.status(200).json({ message: 'Raw material deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting raw material', error });
  }
};

module.exports = {
  createRawMaterial,
  getAllRawMaterials,
  getRawMaterialById,
  updateRawMaterial,
  deleteRawMaterial
};
