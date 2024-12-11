const mongoose = require('mongoose');

const rawMaterialDataSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    materialType: { type: String, required: true }, // limestone, clay, etc.
    quantitySupplied: { type: Number, required: true }, // in metric tons
    reportingPeriod: { type: String, required: true }, // e.g., "Q1 2024"
    createdAt: { type: Date, default: Date.now },
    rawMaterialBill: {type: String, required: false,}// Could store the file path or a link to the bill
});
  
module.exports = mongoose.model('RawMaterialData', rawMaterialDataSchema);
  