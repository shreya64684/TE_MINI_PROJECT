const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rawMaterialRoutes = require('./routes/rawMaterialRoutes');
const goodsAndServicesRoutes = require('./routes/goodsAndServicesRoutes');
const fuelRoutes = require('./routes/fuelRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');
const wasteRoutes = require('./routes/wasteRoutes');
const usersRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware setup
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Secure Carbon Footprint Management Platform!');
});


// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);
app.use('/api/goods-and-services', goodsAndServicesRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/company', companyRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
