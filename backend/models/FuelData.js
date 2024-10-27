const mongoose = require('mongoose');

const fuelDataSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fuelType: { type: String, required: true }, // coal, natural gas, etc.
    quantitySupplied: { type: Number, required: true }, // total amount of fuel in metric tons or cubic meters
    lowerHeatingValue: { type: Number }, // MJ/kg or BTU/lb
    carbonContent: { type: Number }, // kg of carbon per unit, optional
    reportingPeriod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
  
module.exports = mongoose.model('FuelData', fuelDataSchema);
  