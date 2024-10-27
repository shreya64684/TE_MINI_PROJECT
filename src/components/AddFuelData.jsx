import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddFuelData = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        fuelType: '',
        quantitySupplied: '',
        lowerHeatingValue: '',
        carbonContent: '',
        reportingPeriod: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/add-fuel-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure JWT token is sent for authentication
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Fuel data successfully added.');
                setErrorMessage('');
                // Reset form
                setFormData({
                    fuelType: '',
                    quantitySupplied: '',
                    lowerHeatingValue: '',
                    carbonContent: '',
                    reportingPeriod: '',
                });
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Failed to add fuel data.');
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error submitting data, please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Fuel Data</h2>
            {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Fuel Type</label>
                    <input
                        type="text"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., Coal, Natural Gas"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Quantity Supplied (metric tons or cubic meters)</label>
                    <input
                        type="number"
                        name="quantitySupplied"
                        value={formData.quantitySupplied}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., 100"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Lower Heating Value (MJ/kg or BTU/lb)</label>
                    <input
                        type="number"
                        name="lowerHeatingValue"
                        value={formData.lowerHeatingValue}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Optional"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Carbon Content (kg of carbon per unit)</label>
                    <input
                        type="number"
                        name="carbonContent"
                        value={formData.carbonContent}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Optional"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Reporting Period</label>
                    <input
                        type="text"
                        name="reportingPeriod"
                        value={formData.reportingPeriod}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., January 2023"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"
                >
                    Submit Data
                </button>
            </form>
        </div>
    );
};

export default AddFuelData;
