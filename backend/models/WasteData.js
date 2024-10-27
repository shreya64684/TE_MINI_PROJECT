const mongoose = require('mongoose');

const wasteDataSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wasteType: { type: String, required: true }, // hazardous, non-hazardous, etc.
    disposalMethod: { type: String, required: true }, // landfill, incineration, etc.
    emissionsFactor: { type: Number }, // kg CO2e per ton
    totalWeight: { type: Number, required: true }, // in kg or metric tons
    reportingPeriod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('WasteData', wasteDataSchema);

  