const Fuel = require('../models/FuelData');

// Create a new fuel entry
const createFuel = async (req, res) => {
  try {
    const newFuel = new Fuel(req.body);
    const savedFuel = await newFuel.save();
    res.status(201).json(savedFuel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating fuel entry', error });
  }
};

// Get all fuel entries
const getAllFuels = async (req, res) => {
  try {
    const fuels = await Fuel.find();
    res.status(200).json(fuels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fuel entries', error });
  }
};

// Get a specific fuel entry by ID
const getFuelById = async (req, res) => {
  try {
    const fuel = await Fuel.findById(req.params.id);
    if (!fuel) {
      return res.status(404).json({ message: 'Fuel not found' });
    }
    res.status(200).json(fuel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fuel entry', error });
  }
};

// Update a fuel entry by ID
const updateFuel = async (req, res) => {
  try {
    const updatedFuel = await Fuel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFuel) {
      return res.status(404).json({ message: 'Fuel not found' });
    }
    res.status(200).json(updatedFuel);
  } catch (error) {
    res.status(500).json({ message: 'Error updating fuel entry', error });
  }
};

// Delete a fuel entry by ID
const deleteFuel = async (req, res) => {
  try {
    const deletedFuel = await Fuel.findByIdAndDelete(req.params.id);
    if (!deletedFuel) {
      return res.status(404).json({ message: 'Fuel not found' });
    }
    res.status(200).json({ message: 'Fuel entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fuel entry', error });
  }
};

module.exports = {
  createFuel,
  getAllFuels,
  getFuelById,
  updateFuel,
  deleteFuel
};
