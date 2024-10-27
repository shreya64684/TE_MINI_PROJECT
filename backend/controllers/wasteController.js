const Waste = require('../models/WasteData');

// Create a new waste entry
const createWaste = async (req, res) => {
  try {
    const newWaste = new Waste(req.body);
    const savedWaste = await newWaste.save();
    res.status(201).json(savedWaste);
  } catch (error) {
    res.status(500).json({ message: 'Error creating waste entry', error });
  }
};

// Get all waste entries
const getAllWastes = async (req, res) => {
  try {
    const wastes = await Waste.find();
    res.status(200).json(wastes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste entries', error });
  }
};

// Get a specific waste entry by ID
const getWasteById = async (req, res) => {
  try {
    const waste = await Waste.findById(req.params.id);
    if (!waste) {
      return res.status(404).json({ message: 'Waste not found' });
    }
    res.status(200).json(waste);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste entry', error });
  }
};

// Update a waste entry by ID
const updateWaste = async (req, res) => {
  try {
    const updatedWaste = await Waste.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWaste) {
      return res.status(404).json({ message: 'Waste not found' });
    }
    res.status(200).json(updatedWaste);
  } catch (error) {
    res.status(500).json({ message: 'Error updating waste entry', error });
  }
};

// Delete a waste entry by ID
const deleteWaste = async (req, res) => {
  try {
    const deletedWaste = await Waste.findByIdAndDelete(req.params.id);
    if (!deletedWaste) {
      return res.status(404).json({ message: 'Waste not found' });
    }
    res.status(200).json({ message: 'Waste entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting waste entry', error });
  }
};

module.exports = {
  createWaste,
  getAllWastes,
  getWasteById,
  updateWaste,
  deleteWaste
};
