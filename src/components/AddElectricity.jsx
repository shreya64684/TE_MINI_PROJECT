import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddElectricity = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        date: '',
        totalElectricityConsumedMWH: '',
        electricityBill: ''
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
            const response = await fetch(`http://localhost:5000/api/company/${userId}/add-electricity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure JWT token is sent for authentication
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Electricity data successfully added.');
                setErrorMessage('');
                // Reset form
                setFormData({
                    date: '',
                    totalElectricityConsumedMWH: '',
                    electricityBill: ''
                });
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Failed to add electricity data.');
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error submitting data, please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Electricity Data</h2>
            {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Total Electricity Consumed (MWH)</label>
                    <input
                        type="number"
                        name="totalElectricityConsumedMWH"
                        value={formData.totalElectricityConsumedMWH}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., 120"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Electricity Bill</label>
                    <input
                        type="text"
                        name="electricityBill"
                        value={formData.electricityBill}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Link or path to bill (optional)"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Submit Data
                </button>
            </form>
        </div>
    );
};

export default AddElectricity;
