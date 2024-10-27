const mongoose = require('mongoose');

const goodsAndServicesSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemType: { type: String, required: true }, // raw materials, office supplies, etc.
    quantityOrVolume: { type: Number, required: true }, // weight or volume
    reportingPeriod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
  
module.exports = mongoose.model('GoodsAndServices', goodsAndServicesSchema);
  