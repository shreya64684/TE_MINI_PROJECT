

const mongoose = require('mongoose');

const ElectricityDataSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    totalElectricityConsumedMWH: {
        type: Number,
        required: true,
    },
    electricityBill: {
        type: String, // Could store the file path or a link to the bill
        required: false,
    },
});

const CO2EmissionDataSchema = new mongoose.Schema({
    sourceName: {
        type: String,
        required: true,
    },
    emissionType: {
        type: String,
        required: true,
    },
    co2AmountTons: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
});

const CompanySchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    electricityData: [ElectricityDataSchema], // Array of electricity data records
    co2EmissionsData: [CO2EmissionDataSchema], // Array of CO2 emissions records from non-kiln sources
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Company', CompanySchema);
