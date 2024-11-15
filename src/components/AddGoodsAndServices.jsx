import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddGoodsAndServices = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        itemType: '',
        quantityOrVolume: '',
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
            const response = await fetch(`http://localhost:5000/api/company/${userId}/add-goods-services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure JWT token is sent for authentication
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                
                setSuccessMessage('Goods and Services data successfully added.');
                setErrorMessage('');
                // Reset form
                setFormData({
                    itemType: '',
                    quantityOrVolume: '',
                    reportingPeriod: '',
                });
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Failed to add Goods and Services data.');
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error submitting data, please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Goods and Services Data</h2>
            {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Item Type</label>
                    <input
                        type="text"
                        name="itemType"
                        value={formData.itemType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., Raw Materials, Office Supplies"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Quantity or Volume</label>
                    <input
                        type="number"
                        name="quantityOrVolume"
                        value={formData.quantityOrVolume}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., 150"
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

export default AddGoodsAndServices;
