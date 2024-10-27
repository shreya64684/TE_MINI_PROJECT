// routes/company.js

const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const User = require('../models/User');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware'); 



// Add Electricity Data to a Company
router.post('/:id/add-electricity', verifyToken, async (req, res) => {
    const { date, totalElectricityConsumedMWH, electricityBill } = req.body;
    console.log(req.body);

    const userCompanyId  = req.params.id;
    console.log('companyId from request:', userCompanyId);

    try {
        const company = await Company.findOne({ companyId: userCompanyId }).populate('companyId');
        console.log('Company fetched:', company);

    if (!company) {
        return res.status(404).json({ success: false, message: 'Company not found or invalid company ID' });
    }

    const consumptionNum = Number(totalElectricityConsumedMWH);
    const formattedDate = new Date(date);

    console.log('Electricity Data to be added:', { date: formattedDate, totalElectricityConsumedMWH, electricityBill });

        company.electricityData.push({ date: formattedDate, totalElectricityConsumedMWH: consumptionNum, electricityBill });
        await company.save();

        res.status(201).json({ success: true, message: 'Electricity data added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add electricity data' });
    }
});

router.post('/:id/add-co2-emissions', verifyToken, async (req, res) => {
    const { sourceName,emissionType, co2Amount, date, notes} = req.body;
    console.log(req.body);
    
    const userCompanyId  = req.params.id;
    console.log('companyId from request:', userCompanyId);

    try {
        const company = await Company.findOne({ companyId: userCompanyId }).populate('companyId');
        console.log('Company fetched:', company);

    if (!company) {
        return res.status(404).json({ success: false, message: 'Company not found or invalid company ID' });
    }


    // Convert co2Amount to a number
    const co2AmountNum = Number(co2Amount);
    // Convert the date to a Date object
    const formattedDate = new Date(date); // This should be a valid date string


    console.log('Emission Data to be added:', { sourceName, emissionType, co2Amount: co2AmountNum, date: formattedDate, notes });


    company.co2EmissionsData.push({ sourceName, emissionType,co2AmountTons: co2AmountNum,  // Ensure it's a number
        date: formattedDate, notes });

    // Try saving the updated company document
    await company.save();
    console.log('Data saved successfully!');

        res.status(201).json({ success: true, message: 'emission data added successfully' });
    } catch (error) {
        console.error('Error while saving emission data:', error);
        res.status(500).json({ success: false, message: 'Failed to add emission data' });
    }
});

module.exports = router;
