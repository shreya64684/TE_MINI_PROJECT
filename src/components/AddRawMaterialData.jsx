// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// const AddRawMaterialData = () => {
//     const { providerId } = useParams(); // Get the provider ID from URL parameters
//     const [formData, setFormData] = useState({
//         materialType: '',
//         quantitySupplied: '',
//         reportingPeriod: '',
//     });
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/raw-material`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure JWT token is sent for authentication
//                 },
//                 body: JSON.stringify({
//                     ...formData,
//                     providerId, // Include the providerId in the request body
//                 }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setSuccessMessage('Raw material data successfully added.');
//                 setErrorMessage('');
//                 // Reset form
//                 setFormData({
//                     materialType: '',
//                     quantitySupplied: '',
//                     reportingPeriod: '',
//                 });
//             } else {
//                 setSuccessMessage('');
//                 setErrorMessage(data.message || 'Failed to add raw material data.');
//             }
//         } catch (error) {
//             setSuccessMessage('');
           
//             setErrorMessage('Error submitting data, please try again.');
//         }
//     };

//     return (
//         <div className="p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Raw Material Data</h2>
//             {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
//             {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-gray-600">Material Type</label>
//                     <input
//                         type="text"
//                         name="materialType"
//                         value={formData.materialType}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded-md"
//                         placeholder="e.g., limestone, clay"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-600">Quantity Supplied (Metric Tons)</label>
//                     <input
//                         type="number"
//                         name="quantitySupplied"
//                         value={formData.quantitySupplied}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded-md"
// placeholder="e.g., Q1 2024"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-600">Reporting Period</label>
//                     <input
//                         type="text"
//                         name="reportingPeriod"
//                         value={formData.reportingPeriod}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded-md"
//                         placeholder="e.g., Q1 2024"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
//                 >
//                     Submit Data
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddRawMaterialData;


import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
const AddRawMaterialData = () => {
    const {userId} = useParams();
    console.log("raw-userId", userId);
    const [materialType, setMaterialType] = useState('');
    const [quantitySupplied, setQuantitySupplied] = useState('');
    const [reportingPeriod, setReportingPeriod] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const rawMaterialData = {
            providerId: userId, // Ensure you're passing the correct userId
            materialType,
            quantitySupplied: Number(quantitySupplied),
            reportingPeriod,
        };
        console.log("Data to be submitted:", rawMaterialData);
        try {
            const response = await fetch('http://localhost:5000/api/raw-materials/create-raw-material', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify(rawMaterialData), // Convert data to JSON
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Raw material added:', data);
            // Reset the form or redirect as needed
        } catch (err) {
            console.error('Error submitting data:', err); // This will help you identify the issue
            setError('Error submitting data, please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Raw Material Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
                         <label className="block text-gray-600">Material Type</label>
            <input
                type="text"
                placeholder="Material Type"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                required
                 className="w-full p-3 border border-gray-300 rounded-md"
            />
            </div>
             <div>
                          <label className="block text-gray-600">Material Type</label>
            <input
                type="number"
                placeholder="Quantity Supplied (metric tons)"
                value={quantitySupplied}
                onChange={(e) => setQuantitySupplied(e.target.value)}
                required
                 className="w-full p-3 border border-gray-300 rounded-md"
            />
            </div>
             <div>
                              <label className="block text-gray-600">Material Type</label>
            <input
                type="text"
                placeholder="e.g., Q1 2024"
                value={reportingPeriod}
                onChange={(e) => setReportingPeriod(e.target.value)}
                required
                 className="w-full p-3 border border-gray-300 rounded-md"
            />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200">Add Raw Material</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        </div>
    );
};

export default AddRawMaterialData;
