// routes/company.js

const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const User = require('../models/User');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware'); 

router.get('/:id', async (req, res) => {
    const userCompanyId = req.params.id;
    console.log('companyId from request:', userCompanyId);
    try {
    
        const report = await Company.findOne({ companyId: userCompanyId }); // Fetch data based on company
        console.log('Company fetched:', report);

        if (!report) {
            return res.status(404).json({ message: "No report data found for this company." });
        }

        // Respond with the electricity data
        res.status(200).json({
            message: 'company data retrieved successfully',
            data: report
        });
         
    } catch (error) {
        console.error('Error fetching report data:', error);
        res.status(500).json({ message: "Server error" });
    }
});



// Add Electricity Data to a Company
router.post('/:id/add-electricity', verifyToken, async (req, res) => {
    console.log(req.body);
    const { date, totalElectricityConsumedMWH, electricityBillHash } = req.body;
    console.log("date, totalElectricityConsumedMWH, electricityBillHash: ", req.body);

    const userCompanyId  = req.params.id;
    console.log('companyId from request:', userCompanyId);

    try {
        // Check if an entry already exists for the user in the Company collection
        let company = await Company.findOne({ companyId: userCompanyId });
        // const company = await Company.findOne({ companyId: userCompanyId }).populate('companyId');
        console.log('Company fetched:', company);

    if (!company) {
        // If no entry exists, create a new one
        console.log('Company entry not found, creating new entry.');
        company = new Company({
            companyId: userCompanyId,
            electricityData: [],
            co2EmissionsData: [],
            rawMaterialData: [],
        });
        // return res.status(404).json({ success: false, message: 'Company not found or invalid company ID' });
    }
    console.log(electricityBillHash);
    const formattedDate = new Date(date);
    const consumptionNum = Number(totalElectricityConsumedMWH);
   

    console.log('Electricity Data to be added:', { date: formattedDate, totalElectricityConsumedMWH, electricityBillHash });

        company.electricityData.push({ 
            date: formattedDate,
             totalElectricityConsumedMWH: consumptionNum,
             electricityBill: electricityBillHash });
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
         // Check if an entry already exists for the user in the Company collection
         let company = await Company.findOne({ companyId: userCompanyId });
         // const company = await Company.findOne({ companyId: userCompanyId }).populate('companyId');
         console.log('Company fetched:', company);

    if (!company) {
        // If no entry exists, create a new one
        console.log('Company entry not found, creating new entry.');
        company = new Company({
            companyId: userCompanyId,
            electricityData: [],
            co2EmissionsData: []
        });
        // return res.status(404).json({ success: false, message: 'Company not found or invalid company ID' });
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

router.post('/:id/add-raw-material', verifyToken, async (req, res) => {
    console.log("add-raw-material-api--------------------------");
    console.log(req.body); 
    const { date, material, rawMaterialBill } = req.body;

    const userCompanyId = req.params.id;
    console.log('Company ID from request:', userCompanyId);

    try {
        // Check if an entry already exists for the user in the Company collection
        let company = await Company.findOne({ companyId: userCompanyId });
        console.log('Company fetched:', company);

        if (!company) {
            // If no entry exists, create a new one
            console.log('Company entry not found, creating new entry.');
            company = new Company({
                companyId: userCompanyId,
                electricityData: [],
                co2EmissionsData: [],
                rawMaterialData: [],
            });
        }
        console.log("raw material bill hash: ", rawMaterialBill );
        const formattedDate = new Date(date);
        console.log("Materials: " , material);
        // Parse materials into the correct format if necessary
        const parsedMaterials = material.map((material) => ({
            materialType: material.materialType,
            quantitySupplied: Number(material.quantitySupplied),
        }));
        console.log("parsedMaterials: ", parsedMaterials);
        console.log('Raw Material Data to be added:', { date: formattedDate, material: parsedMaterials, rawMaterialBill });

        // Add the new raw material data entry
        company.rawMaterialData.push({
            date: formattedDate,
            material: parsedMaterials,
            rawMaterialBill: rawMaterialBill,
        });

        // Save the company with the new data
        await company.save();

        res.status(201).json({ success: true, message: 'Raw material data added successfully' });
    } catch (error) {
        console.error('Error adding raw material data:', error);
        res.status(500).json({ success: false, message: 'Failed to add raw material data' });
    }
});


router.get('/:id/electricity-data', verifyToken, async(req,res) => {
    const userCompanyId  = req.params.id;
    console.log('companyId from request:', userCompanyId);

   
    try {
        const company = await Company.findOne({ companyId: userCompanyId });
        console.log("company:",company);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Respond with the electricity data
        res.status(200).json({
            message: 'Electricity data retrieved successfully',
            electricityData: company.electricityData,
        });
         
      } catch (error) {
        console.error('Error fetching electricity data:', error);
        res.status(500).json({ message: 'Server error while fetching electricity data' });
      }
});

// Get Raw Material Data for a Company
router.get('/:id/raw-material-data', verifyToken, async (req, res) => {
    const userCompanyId = req.params.id;
    console.log('Company ID from request:', userCompanyId);

    try {
        const company = await Company.findOne({ companyId: userCompanyId });
        console.log('Company:', company);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Respond with the raw material data
        res.status(200).json({
            message: 'Raw material data retrieved successfully',
            rawMaterialData: company.rawMaterialData,
        });
    } catch (error) {
        console.error('Error fetching raw material data:', error);
        res.status(500).json({ message: 'Server error while fetching raw material data' });
    }
});

router.patch('/:companyId/electricity-data/verify', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    const { date } = req.body; // Use `date` or any other unique identifier from the request body

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Find the specific electricity data by date
        const electricityData = company.electricityData.find(
            (data) => new Date(data.date).toISOString() === new Date(date).toISOString()
        );

        if (!electricityData) {
            return res.status(404).json({ message: 'Electricity data not found' });
        }

        // Update the verified and accepted fields
        electricityData.verified = true;
        // electricityData.accepted = true;
        console.log("Verify:", electricityData.verified);

        await company.save();
        res.status(200).json({ message: 'Electricity data verified successfully' });
    } catch (error) {
        console.error('Error updating electricity data:', error);
        res.status(500).json({ message: 'Server error while updating electricity data' });
    }
});

// Accept electricity data
router.patch('/:companyId/electricity-data/accept', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    const { date } = req.body; // Use `date` or any other unique identifier from the request body

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Find the specific electricity data by date
        const electricityData = company.electricityData.find(
            (data) => new Date(data.date).toISOString() === new Date(date).toISOString()
        );

        if (!electricityData) {
            return res.status(404).json({ message: 'Electricity data not found' });
        }

        // Update the verified and accepted fields
       
        electricityData.accepted = true;
        console.log(electricityData.accepted);
        await company.save();
        res.status(200).json({ message: 'Electricity data accepted successfully' });
    } catch (error) {
        console.error('Error updating electricity data:', error);
        res.status(500).json({ message: 'Server error while updating electricity data' });
    }
});

// PATCH: /api/company/:userId/electricity-data/reject
router.patch('/:companyId/electricity-data/reject', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    const { date, remark } = req.body;

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Find the specific electricity data by date
        const electricityData = company.electricityData.find(
            (data) => new Date(data.date).toISOString() === new Date(date).toISOString()
        );

        if (!electricityData) {
            return res.status(404).json({ message: 'Electricity data not found' });
        }

        electricityData.verified = false;
        console.log("Verfiy status after rejection: " , electricityData.verified);
        electricityData.remark = remark;
        console.log("Remark after rejection: " , electricityData.remark );
        await company.save();
        res.status(200).json({ message: 'Data rejected successfully', data });
    } catch (error) {
        console.error('Error updating electricity data:', error);
        res.status(500).json({ message: 'Error rejecting data', error });
    }
});

router.patch('/:companyId/raw-material-data/verify', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    const { billHash } = req.body; // Using `billHash` as a unique identifier

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Find the specific raw material data by billHash
        const rawMaterialData = company.rawMaterialData.find(
            (data) => data.rawMaterialBill === billHash
        );

        if (!rawMaterialData) {
            return res.status(404).json({ message: 'Raw material data not found' });
        }

        // Update the verified field
        rawMaterialData.verified = true;
        console.log("Verify:", rawMaterialData.verified);

        await company.save();
        res.status(200).json({ message: 'Raw material data verified successfully' });
    } catch (error) {
        console.error('Error updating raw material data:', error);
        res.status(500).json({ message: 'Server error while updating raw material data' });
    }
});

// Accept raw material data
router.patch('/:companyId/raw-material-data/accept', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    console.log("req.body in accept: ", req.body);
    const { billHash } = req.body; // Use billHash as the unique identifier
    console.log("billHash in accept route: ", billHash); // Use billHash as the unique identifier
    
    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Find the specific raw material data by billHash
        const rawMaterialData = company.rawMaterialData.find(
            (data) => data.rawMaterialBill === billHash
        );

        if (!rawMaterialData) {
            return res.status(404).json({ message: 'Raw material data not found' });
        }

        // Update the accepted field
        rawMaterialData.accepted = true;
        console.log("Accepted:", rawMaterialData.accepted);

        await company.save();
        res.status(200).json({ message: 'Raw material data accepted successfully' });
    } catch (error) {
        console.error('Error updating raw material data:', error);
        res.status(500).json({ message: 'Server error while updating raw material data' });
    }
});

// Reject raw material data
router.patch('/:companyId/raw-material-data/reject', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    const { billHash, remark } = req.body;

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Find the specific raw material data by billHash
        const rawMaterialData = company.rawMaterialData.find(
            (data) => data.rawMaterialBill === billHash
        );

        if (!rawMaterialData) {
            return res.status(404).json({ message: 'Raw material data not found' });
        }

        // Update verification status and add rejection remark
        rawMaterialData.verified = false;
        console.log("Verify status after rejection:", rawMaterialData.verified);
        rawMaterialData.remark = remark;
        console.log("Remark after rejection:", rawMaterialData.remark);

        await company.save();
        res.status(200).json({ message: 'Raw material data rejected successfully', data: rawMaterialData });
    } catch (error) {
        console.error('Error rejecting raw material data:', error);
        res.status(500).json({ message: 'Error rejecting data', error });
    }
});



router.post('/:id/add-fuel-data', verifyToken, async (req, res) => {
    console.log("add-fuel-data-api--------------------------");
    console.log("req.body in add fuel: ",req.body); 
    const { date, fuel, fuelBill } = req.body;
    console.log("Extracted Data: ", { date, fuel, fuelBill });

    if (!date || !fuel || !fuelBill) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const userCompanyId = req.params.id;
    console.log('Company ID from request:', userCompanyId);

    try {
        // Check if an entry already exists for the user in the Company collection
        let company = await Company.findOne({ companyId: userCompanyId });
        console.log('Company fetched:', company);

        if (!company) {
            // If no entry exists, create a new one
            console.log('Company entry not found, creating new entry.');
            company = new Company({
                companyId: userCompanyId,
                electricityData: [],
                co2EmissionsData: [],
                rawMaterialData: [],
                fuelData: [], // Adding fuelData array in case the company does not exist
            });
        } else if (!company.fuelData) {
            console.log('Company found but fuelData is missing, updating...');
            company.fuelData = []; // Initialize if missing
        }
        console.log("Fuel Data before parsing:", fuel);
        console.log("Fuel bill hash: ", fuelBill );

        const formattedDate = new Date(date);
        console.log("Fuel array: " , fuel);
        
        // Parse fuel type into the correct format if necessary
        const parsedFuels = fuel.map((fuel) => ({
            fuelType: fuel.fuelType,
            quantitySupplied: Number(fuel.quantitySupplied),
            lowerHeatingValue: Number(fuel.lowerHeatingValue),
            carbonContent: Number(fuel.carbonContent), // kg of carbon per unit, optiona
        }));
        console.log("parsedFuel: ", parsedFuels);

       
        console.log('Fuel Data to be added:', { date: formattedDate, fuel: parsedFuels, fuelBill });

        // Add the new fuel data entry
        company.fuelData.push({
            date: formattedDate,
            fuel: parsedFuels,
            fuelBill: fuelBill,
        });

        console.log(company.fuelData);
     
        await company.save()
        .then(() => console.log(company.fuelData,"Data saved successfully"))
        .catch(err => console.error("Error saving data:", err));

        console.log("Fuel data added successfully");
        res.status(201).json({ success: true, message: 'Fuel data added successfully' });
    } catch (error) {
        console.error('Error adding fuel data:', error);
        res.status(500).json({ success: false, message: 'Failed to add fuel data' });
    }
});

router.get('/:id/fuel-data', verifyToken, async (req, res) => {
    const userCompanyId = req.params.id;
    console.log('Company ID from request:', userCompanyId);

    try {
        const company = await Company.findOne({ companyId: userCompanyId });
        console.log('Company:', company);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Respond with the fuel data
        res.status(200).json({
            message: 'Fuel data retrieved successfully',
            fuelData: company.fuelData,
        });
    } catch (error) {
        console.error('Error fetching fuel data:', error);
        res.status(500).json({ message: 'Server error while fetching fuel data' });
    }
});

// Verify fuel data
router.patch('/:companyId/fuel-data/verify', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    console.log("req.body in verify fuel", req.body);
    const billHash  = req.body.fuelBill;
    console.log(billHash);

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const fuelData = company.fuelData.find((data) => data.fuelBill === billHash);
        if (!fuelData) {
            return res.status(404).json({ message: 'Fuel data not found' });
        }

        fuelData.verified = true;
        await company.save();
        res.status(200).json({ message: 'Fuel data verified successfully' });
    } catch (error) {
        console.error('Error verifying fuel data:', error);
        res.status(500).json({ message: 'Server error while verifying fuel data' });
    }
});

// Accept fuel data
router.patch('/:companyId/fuel-data/accept', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    console.log("req.body in accept: ", req.body);
    const  billHash  =  req.body.fuelBill;
    console.log("billHash in accept route: ", billHash); 

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const fuelData = company.fuelData.find((data) => data.fuelBill === billHash);
        if (!fuelData) {
            return res.status(404).json({ message: 'Fuel data not found' });
        }

        fuelData.accepted = true;
        await company.save();
        res.status(200).json({ message: 'Fuel data accepted successfully' });
    } catch (error) {
        console.error('Error accepting fuel data:', error);
        res.status(500).json({ message: 'Server error while accepting fuel data' });
    }
});

// Reject fuel data
router.patch('/:companyId/fuel-data/reject', verifyToken, async (req, res) => {
    const { companyId } = req.params;
    const { billHash, remark } = req.body;

    try {
        const company = await Company.findOne({ companyId });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const fuelData = company.fuelData.find((data) => data.fuelBill === billHash);
        if (!fuelData) {
            return res.status(404).json({ message: 'Fuel data not found' });
        }

        fuelData.verified = false;
        fuelData.remark = remark;

        await company.save();
        res.status(200).json({ message: 'Fuel data rejected successfully', data: fuelData });
    } catch (error) {
        console.error('Error rejecting fuel data:', error);
        res.status(500).json({ message: 'Error rejecting fuel data' });
    }
});

module.exports = router;
