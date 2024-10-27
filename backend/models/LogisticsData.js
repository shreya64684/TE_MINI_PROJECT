const mongoose = require('mongoose');

const logisticsDataSchema = new mongoose.Schema({
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transportType: { type: String, required: true }, // Truck, Ship, etc.
    distanceCovered: { type: Number, required: true }, // in km/miles
    loadVolume: { type: Number, required: true }, // weight of transported goods
    fuelType: { type: String, required: true }, // Diesel, Electric, etc.
    reportingPeriod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('LogisticsData', logisticsDataSchema);
  