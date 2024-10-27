const Logistics = require('../models/LogisticsData');

// Create a new logistics entry
const createLogistics = async (req, res) => {
  try {
    const newLogistics = new Logistics(req.body);
    const savedLogistics = await newLogistics.save();
    res.status(201).json(savedLogistics);
  } catch (error) {
    res.status(500).json({ message: 'Error creating logistics entry', error });
  }
};

// Get all logistics entries
const getAllLogistics = async (req, res) => {
  try {
    const logistics = await Logistics.find();
    res.status(200).json(logistics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logistics entries', error });
  }
};

// Get a specific logistics entry by ID
const getLogisticsById = async (req, res) => {
  try {
    const logistics = await Logistics.findById(req.params.id);
    if (!logistics) {
      return res.status(404).json({ message: 'Logistics not found' });
    }
    res.status(200).json(logistics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logistics entry', error });
  }
};

// Update a logistics entry by ID
const updateLogistics = async (req, res) => {
  try {
    const updatedLogistics = await Logistics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLogistics) {
      return res.status(404).json({ message: 'Logistics not found' });
    }
    res.status(200).json(updatedLogistics);
  } catch (error) {
    res.status(500).json({ message: 'Error updating logistics entry', error });
  }
};

// Delete a logistics entry by ID
const deleteLogistics = async (req, res) => {
  try {
    const deletedLogistics = await Logistics.findByIdAndDelete(req.params.id);
    if (!deletedLogistics) {
      return res.status(404).json({ message: 'Logistics not found' });
    }
    res.status(200).json({ message: 'Logistics entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting logistics entry', error });
  }
};

module.exports = {
  createLogistics,
  getAllLogistics,
  getLogisticsById,
  updateLogistics,
  deleteLogistics
};
