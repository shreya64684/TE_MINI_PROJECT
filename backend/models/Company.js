
const mongoose = require('mongoose');
const { Schema } = mongoose; 
const ElectricityDataSchema = new Schema({
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
    verified: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been verified yet
    },
    accepted: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been accepted yet
    },
    remark: {
        type: String,
        default: '', // Default value is an empty string
    },
});

const CO2EmissionDataSchema = new Schema({
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
    verified: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been verified yet
    },
    accepted: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been accepted yet
    },
    remark: {
        type: String,
        default: '', // Default value is an empty string
    },
});


const rawMaterialSchema = new Schema({
    
    material: [{
        materialType: { type: String, required: true }, // limestone, clay, etc.
        quantitySupplied: { type: Number, required: true }// in metric tons
    }], 
    date: {
        type: Date,
        required: true,
    },
    rawMaterialBill: {
        type: String, 
        required: false,
    },// Could store the file path or a link to the bill
    verified: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been verified yet
    },
    accepted: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been accepted yet
    },
    remark: {
        type: String,
        default: '', // Default value is an empty string
    },
});

const fuelDataSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    fuel: [{
        fuelType: { type: String, required: true }, // coal, natural gas, etc.
        quantitySupplied: { type: Number, required: true }, // in metric tons or cubic meters
        lowerHeatingValue: { type: Number }, // MJ/kg or BTU/lb
        carbonContent: { type: Number }, // kg of carbon per unit, optional
    }],
    fuelBill: {
        type: String, // File path or link to the bill
        required: true,
    },
    verified: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been verified yet
    },
    accepted: {
        type: Boolean,
        default: false, // Default value is false, indicating it hasn't been accepted yet
    },
    remark: {
        type: String,
        default: '', // Default value is an empty string
    },
});

const CompanySchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    electricityData: [ElectricityDataSchema], // Array of electricity data records
    co2EmissionsData: [CO2EmissionDataSchema], // Array of CO2 emissions records from non-kiln sources
    rawMaterialData: [rawMaterialSchema],
    fuelData: [fuelDataSchema], // Array of fuel data records
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
  